const TorrentLink = document.querySelector("header a#torrentLink")

let UpdateTorrentLink = (element) => {
	let encodedMagnetLink = encodeString(element.value)
	CurrentPage = location.href
	let FullPath = `${CurrentPage}?torrent=${encodedMagnetLink}`
	TorrentLink.href = FullPath
};

function encodeString(str) {
	return encodeURIComponent(str);
}
