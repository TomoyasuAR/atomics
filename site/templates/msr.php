<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page->title() ?></title>
    <!-- Link zur style.css  -->
    <?= css ('assets/css/style.css') ?>
    <?= css ('assets/css/interface.css') ?>
    <?= css ('asset7s/css/interface.css') ?>
    <?= js('assets/js/paged.polyfill.js') ?>
    <?= js('assets/js/p5.min.js') ?>

</head>

<body>
    <h2 id="logo">A Creative Coding Community Garden</h2>


    <!-- <h1 class="bgPanel"><?= $page->title() ?></h1> -->
    <!-- <h2 class="bgPanel"><?= $page->subtitle() ?></h2> -->
    <!-- <img src=<?= $page->images() ?> class="bgPanel"> -->
    <p><?= kirbytext($page->description()) ?></p>
    <br>

    <!-- LINKS -->
    <?php 
        if($page->link()->isNotEmpty()): 
            $linkedPages = $page->link()->toPages();
            if($linkedPages->count() > 0):
                foreach($linkedPages as $linkedPage): ?>
    <a href="<?= $linkedPage->url() ?>"><?= $linkedPage->title() ?></a>
    <br>
    <?php endforeach; 
            endif;
        endif; 
    ?>

    <br><br>
    <!-- Last Edited -->
    <p>Edited by <br>
        <?php foreach ($page->author()->toUsers() as $user): ?>
        <?= $user->name() ?> <br>
        <?php endforeach; ?>
    </p>


</body>

</html>