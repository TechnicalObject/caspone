const hostName = window.location.host;
const regex = /test\./g;
const found = hostName.match(regex);
if (found) {
    console.log('yes');
} else {
    console.log('no');
}