<?php

Kirby::plugin('your/backlinks', [
  'pageMethods' => [
    'backlinks' => function() {
      // Hole die aktuelle Seite
      $currentPage = $this;
      
      // Cache-Schlüssel erstellen
      $cacheKey = 'backlinks-' . $currentPage->id();
      
      // Versuche aus dem Cache zu laden
      $cache = kirby()->cache('pages');
      if ($cachedLinks = $cache->get($cacheKey)) {
        return $cachedLinks;
      }
      
      // Alle Seiten nach Links zu dieser Seite durchsuchen
      $backlinks = site()->index()->filter(function($p) use($currentPage) {
        // Ignoriere die aktuelle Seite selbst
        if($p->id() == $currentPage->id()) {
          return false;
        }
        
        // Durchsuche alle Inhaltsfelder
        foreach($p->content()->fields() as $field => $value) {
          // Suche nach page://UUID Links
          if(strpos($value, 'page://' . $currentPage->id()) !== false) {
            return true;
          }
          
          // Optional: Suche auch nach URL-Links oder anderen Formaten
          if(strpos($value, $currentPage->url()) !== false) {
            return true;
          }
        }
        
        return false;
      });
      
      // Im Cache speichern (für 60 Minuten)
      $cache->set($cacheKey, $backlinks, 60);
      
      return $backlinks;
    }
  ],
  'hooks' => [
    // Cache invalidieren wenn eine Seite aktualisiert wird
    'page.update:after' => function() {
      kirby()->cache('pages')->flush();
    }
  ]
]);