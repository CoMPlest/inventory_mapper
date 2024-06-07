import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useEffect, useState } from "react";
import "./App.css";

async function beep() {
  const snd = new Audio(
    "data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  navigator.vibrate([100]);
  await snd.play();
}

function App() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader>();
  const [codeRead, setCodeRead] = useState<string>();
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.timeBetweenDecodingAttempts = 1500;
    setCodeReader(codeReader);
    return () => {
      codeReader.reset();
    };
  }, []);

  useEffect(() => {
    if (!codeReader) return;
    if (codeReader.hasNavigator && codeReader.isMediaDevicesSuported) {
      codeReader.listVideoInputDevices().then((devices) => {
        setDevices(devices);
        console.log(devices);
      });
    }
  }, [codeReader]);

  const scan = async (callBack?: CallableFunction) => {
    if (!codeReader) return;
    setIsScanning(true);
    codeReader.decodeFromVideoDevice(
      selectedDevice?.deviceId ?? "",
      "video",
      async (result, err) => {
        if (result) {
          await beep();
          setCodeRead(result.getText());
          console.log(result);
          stopScan();
          if (callBack) callBack(result.getText());
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      }
    );
  };

  const stopScan = () => {
    setIsScanning(false);
    if (!codeReader) return;
    codeReader.reset();
  };

  useEffect(() => {
    if (isScanning) {
      stopScan();
      scan();
    }
  }, [selectedDevice]);

  const onDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    const device = devices?.find((d) => d.deviceId === deviceId);
    setSelectedDevice(device);
  };

  const saveLocation = async () => {
    if (!codeRead) return;
    const section = document.getElementById("section") as HTMLInputElement;
    const isle = document.getElementById("isle") as HTMLInputElement;
    const division = document.getElementById("division") as HTMLInputElement;
    const shelf = document.getElementById("shelf") as HTMLInputElement;
    const index = document.getElementById("index") as HTMLInputElement;
    if (!section || !isle || !division || !shelf || !index)
      return alert("Please fill all fields");

    scan((code) => {
      localStorage.setItem(
        code,
        JSON.stringify({
          section: section.value,
          isle: isle.value,
          division: division.value,
          shelf: shelf.value,
          index: index.value,
        })
      );
      alert("Location saved");
    });
  };

  const getLocation = async () => {
    scan((code) => {
      if (!code) return alert("No code read");
      const location = localStorage.getItem(code);
      if (!location) return alert("No location found");
      alert(location);
    });
  };

  const removeLocation = async () => {
    scan((code) => {
      if (!code) return alert("No code read");
      localStorage.removeItem(code);
      alert("Location removed");
    });
  };

  return (
    <>
      <h1>{codeRead ?? "no code"}</h1>
      {codeRead && <></>}
      <div>
        <video
          id="video"
          width="300"
          height="200"
          style={{
            border: "1px solid gray",
            filter: "grayscale(100%)",
            objectFit: "cover",
            display: isScanning ? "block" : "none",
          }}
        ></video>
        {isScanning && <button onClick={() => stopScan()}>Stop</button>}
      </div>
      <form>
        <div>
          <label htmlFor="section">Section:</label>
          <input type="text" id="section" name="section" />
        </div>
        <div>
          <label htmlFor="isle">Isle:</label>
          <input type="number" id="isle" name="isle" />
        </div>
        <div>
          <label htmlFor="division">Division:</label>
          <input type="number" id="division" name="division" />
        </div>
        <div>
          Shelf: <input type="number" id="shelf" />
        </div>
        <div>
          Index: <input type="number" id="index" />
        </div>
      </form>

      {!isScanning && <button onClick={() => saveLocation()}>Save</button>}
      {!isScanning && <button onClick={() => getLocation()}>Read</button>}
      {!isScanning && <button onClick={() => removeLocation()}>Remove</button>}
      <button onClick={() => beep()}>Test Beep</button>
      <div>
        {!devices ? (
          <p>No video devices</p>
        ) : (
          <select onChange={onDeviceChange}>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

export default App;
