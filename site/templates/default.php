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

            <h1><?= $page->title() ?></h1>
            <h2><?= $page->subtitle() ?></h2>
            <img src= <?= $page->images() ?>>
            <p><?= $page->description() ?></p>
</body>
</html>
