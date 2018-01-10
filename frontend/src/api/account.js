export default {
  getBills: (cb) => {
    fetch("/data", {accept: "application/json"})
    .then(response => response.json())
    .then(data => cb(data));
  }
}