<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page->title() ?></title>
    <!-- Link zur style.css -->
    <?= css ('assets/css/style.css') ?>
    <?= css ('assets/css/interface.css') ?>
    <?= js('assets/js/paged.polyfill.js') ?>
    <?= js('assets/js/p5.min.js') ?>
    <?= js('assets/js/bg_sketch.js') ?>

</head>

<body>
    <h2 id="logo">atomics</h2>

    <div>
        <button type="button" class="bgPanel">Data Visualisation</button>
        <button type="button" class="bgPanel">Interactive</button>
        <button type="button" class="bgPanel">MIDI</button>
        <button type="button" class="bgPanel">Installation</button>
        <button type="button" class="bgPanel">Expand rooms</button>

    </div>
    <h1 class="bgPanel"><?= $page->title() ?></h1>
    <h2 class="bgPanel"><?= $page->subtitle() ?></h2>
    <img src=<?= $page->images() ?> class="bgPanel">
    <p class="bgPanel"><?= $page->description() ?></p>

</body>

</html>