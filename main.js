const { app, BrowserWindow, ipcMain } = require("electron");
const CDP = require("chrome-remote-interface");

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: false  // allows cross-origin requests
  }
});

  mainWindow.loadFile("index.html");

  // Connect to Playwright browser via CDP
  CDP({ port: 9222 }, async (client) => {
    const { DOM, Input } = client;

    await DOM.enable();

    // Periodically fetch root DOM and send to Electron
    setInterval(async () => {
      try {
        const { root } = await DOM.getDocument();
        const { outerHTML } = await DOM.getOuterHTML({ nodeId: root.nodeId });
        mainWindow.webContents.send("dom-update", outerHTML);
      } catch (err) {
        console.error("DOM fetch error:", err);
      }
    }, 500); // every 500ms

    // Relay input events from Electron to Playwright
    ipcMain.on("input-event", async (event, input) => {
      try {
        if (input.type === "mouse") {
          let type;
          switch (input.action) {
            case "down": type = "mousePressed"; break;
            case "up": type = "mouseReleased"; break;
            case "move": type = "mouseMoved"; break;
            default: return;
          }

          await Input.dispatchMouseEvent({
            type,
            x: input.x,
            y: input.y,
            button: "left",
            clickCount: input.clickCount || 1
          });

        } else if (input.type === "keyboard") {
          let type;
          switch (input.action) {
            case "keydown": type = "keyDown"; break;
            case "keyup": type = "keyUp"; break;
            default: return;
          }

          await Input.dispatchKeyEvent({
            type,
            text: input.key,
            key: input.key,
            unmodifiedText: input.key
          });
        }
      } catch (err) {
        console.error("Error dispatching input to CDP:", err);
      }
    });

  }).on("error", err => {
    console.error("Cannot connect to CDP:", err);
  });
}

app.whenReady().then(createWindow);
