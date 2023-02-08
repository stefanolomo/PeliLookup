<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Torrent Player</title>
	<link rel="stylesheet" href="./css/index.css">
</head>

<body>
	<header>
		<h2>¿Cómo funciona?</h2>
		<p>Esta página utiliza <a href="https://github.com/webtor-io/embed-sdk-js"><abbr title="SDK de incrustación de Webtor.io para transmisión en línea de torrents y descarga en su sitio web.">embed-sdk-js</abbr></a> para reproducir torrents en línea. De esta forma puedes reproducir torrents sin descargarlos</p>
		<p>¿Qué? ¿Que quieres probarlo? Ok, pega el link magnet de algun torrent.</p>
		<input oninput="UpdateTorrentLink(this)" type="text" name="magnet" id="magnetInput">
		<p>¿Listo? Haz click en el link de abajo.</p>
		<a id="torrentLink" href="">Link</a>
	</header>
	<main>
		<section class="video-container">
			<?php
			if (isset($_GET['torrent'])) {
				$torrent = $_GET['torrent'];
				echo $torrent;
				echo '<video controls src"' . $torrent . '"></video>';
				echo '<script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" charset="utf-8" async></script>';
			} else {
				echo '<video controls src=""></video>';
			}
			?>
		</section>
		<section class="info">
			<table class="desktop">
				<caption><h4>Información</h4></caption>
				<tbody>
					<tr>
						<td>Magnet link del torrent actual</td>
						<td>
							<?php
							if (isset($_GET['torrent'])) {
								$torrent = $_GET['torrent'];
							} else {
								echo '-';
							}
							?>
						</td>
					</tr>
					<tr>
						<td>Estado de la reproducción</td>
						<td>
							<?php
							if (isset($_GET['torrent'])) {
								$torrent = $_GET['torrent'];
								if ($torrent) {
									echo '<p class="success">Correcto<p>';
								}
							} else {
								echo '<p class="error">Error<p>';
							}
							?>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<script src="./js/index.js"></script>
	</main>
</body>

</html>