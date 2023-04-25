#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::{Serialize, Deserialize};
use url::Url;
extern crate uuid;

// struct Tabs {
//   tabs: Mutex<Vec<Tab>>,
//   current: Mutex<String>
// }

// #[derive(Serialize, Clone)]
// struct TabsLocked {
//   tabs: String,
//   current: String
// }

// impl Tabs {
//   fn lock(&self) -> TabsLocked {
//     let mut copied = HashMap::new();
//     copied.clone_from(&(*self.tabs.lock().unwrap()));
//     TabsLocked { tabs: copied, current: (*self.current.lock().unwrap()).clone() }
//   }
// }

fn main() {
  tauri::Builder::default()
    // .manage(Tabs { tabs: Mutex::new(Vec::new()), current: Mutex::new(String::new()) })
    .invoke_handler(tauri::generate_handler![parse_url, generate_id])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// #[tauri::command]
// fn new_tab(tabs: State<Tabs>, window: Window) -> () {
//   let mut tabs_lc = tabs.tabs.lock().unwrap();
//   let mut current = tabs.current.lock().unwrap();
//   let new_id = generate_id();
//   // (*tabs_lc).insert(new_id.clone(), Tab::new());
//   (*tabs_lc).push(Tab::new(new_id.clone()));
//   *current = new_id;

//   println!("{tabs_lc:?}");

//   window.emit("tabs-update", TabsLocked { tabs: serde_json::to_string(&(*tabs_lc)).unwrap(), current: (*current).clone() });
//   ()
// }

// #[tauri::command]
// fn set_tabs(tabs: State<Tabs>, new_value: String) -> () {
//   let mut tabs_lc = tabs.tabs.lock().unwrap();
//   *tabs_lc = serde_json::from_str(&new_value).unwrap();
//   ()
// }

// #[tauri::command]
// fn set_tab_url(tabs: State<Tabs>, id: String, url: String, window: Window) {
//   let mut tabs_lc = tabs.tabs.lock().unwrap();
//   let current = tabs.current.lock().unwrap();
//   let index = tabs_lc.iter().position(|t| t.id == id).unwrap();
//   (*tabs_lc)[index] = tabs_lc[index].set_url(&url).to_owned();
//   window.emit("tabs-update", TabsLocked { tabs: serde_json::to_string(&(*tabs_lc)).unwrap(), current: (*current).clone() });
// }

// #[tauri::command]
// fn set_current_tab(tabs: State<Tabs>, id: String, window: Window) {
//   let tabs_lc = tabs.tabs.lock().unwrap();
//   let mut current = tabs.current.lock().unwrap();
//   *current = id;
//   window.emit("tabs-update", TabsLocked { tabs: serde_json::to_string(&(*tabs_lc)).unwrap(), current: (*current).clone() });
// }

// #[tauri::command]
// fn get_tabs(tabs: State<Tabs>, window: Window) {
//   let tabs_lc = tabs.tabs.lock().unwrap();
//   let current = tabs.current.lock().unwrap();
//   window.emit("tabs-update", TabsLocked { tabs: serde_json::to_string(&(*tabs_lc)).unwrap(), current: (*current).clone() });
// }

#[derive(Serialize, Deserialize, Clone, Debug)]
struct UrlParsed {
  scheme: String,
  username: String,
  password: Option<String>,
  host: Option<String>,
  port: Option<u16>,
  path: String,
  query: Option<String>,
  fragment: Option<String>,
}

impl UrlParsed {
  fn from(from: Url) -> Self {
    UrlParsed { scheme: from.scheme().to_string(), username: from.username().to_string(), password: from.password().map(|s| s.to_string()), host: from.host().map(|s| s.to_string()), port: from.port_or_known_default(), path: from.path().to_string(), query: from.query().map(|s| s.to_string()), fragment: from.fragment().map(|s| s.to_string()) }
  }
}

#[tauri::command]
async fn parse_url(url: String) -> Option<String> {
  let res = Url::parse(url.as_str());
  if let Ok(u) = res {
    let s = serde_json::to_string(&UrlParsed::from(u));
    if let Ok(result) = s {
      Some(result)
    } else {
      None
    }
  } else {
    None
  }
}

#[tauri::command]
fn generate_id() -> String {
  uuid::Uuid::new_v4().to_string()
}

// // #[tauri::command]
// // async fn request(method: String, url: String) -> Result<String, Error> {
// //   match method.as_str() {
// //     "GET" => {
// //       let res = get_request(url).await;
// //       if let Ok(i) = res {
// //         Ok(i)
// //       } else {
// //         Err(res.unwrap_err())
// //       }
// //     },
// //     _ => {
// //       println!("method not implemented");
// //       Ok(String::new())
// //     }
// //   }
// // }

// // async fn get_request(url: String) -> Result<String, Error> {
// //   let body = reqwest::get(url)
// //   .await?
// //   .text()
// //   .await?;

// //   Ok(body)
// // }

// #[derive(Default, Serialize, Deserialize, Clone, Debug)]
// enum Method {
//   #[default]
//   GET,
//   POST,
//   DELETE
// }

// #[derive(Serialize, Deserialize, Clone, Debug)]
// struct Tab {
//   id: String,
//   content: String,
//   method: Method,
//   url: String,
//   name: String,
//   response: Option<String>,
//   url_parsed: Option<UrlParsed>
// }

// impl Tab {
//   fn new(id: String) -> Self {
//     Tab { id, content: String::new(), method: Method::GET, url: String::new(), name: String::from("New Tab"), response: None, url_parsed: None }
//   }
//   fn set_url(&mut self, url: &String) -> &mut Tab {
//     self.url = url.to_string();
//     self
//   }
// }