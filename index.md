---
layout: layout.njk
title: home
---

<section class="home-intro">
  <h1>안녕 🦭</h1>
  <p> this space was inspired by silly seals napping on small rocks and shit.</p>
</section>

<section class="home-featured">
  <h2>latest entries</h2>
  <div class="card-container">
    {%- set recentJournal = collections.journaling | reverse | first %}
    {%- if recentJournal %}
      <a href="{{ recentJournal.url }}" class="post-card-link">
        <div class="post-card">
          <div class="post-title">{{ recentJournal.data.title }}</div>
          <p class="post-date">{{ recentJournal.date | readableDate }}</p>
        </div>
      </a>
    {%- endif %}

    {%- set recentLearning = collections.learning | reverse | first %}
    {%- if recentLearning %}
      <a href="{{ recentLearning.url }}" class="post-card-link">
        <div class="post-card">
          <div class="post-title">{{ recentLearning.data.title }}</div>
          <p class="post-date">{{ recentLearning.date | readableDate }}</p>
        </div>
      </a>
    {%- endif %}
  </div>
</section>


<section class="home-playlist">
  <iframe 
    style="border-radius:12px" 
    src="https://open.spotify.com/embed/playlist/2ZnXnZk5ttIPWKZIJHe4Ds?utm_source=generator" 
    width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; 
    encrypted-media; fullscreen; picture-in-picture" loading="lazy">
  </iframe>
</section>