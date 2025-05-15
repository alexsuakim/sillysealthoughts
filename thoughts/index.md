---
title: Thoughts
layout: layout.njk
---
<div class="post-list">
  {% for post in collections.thoughts %}
    <div class="post-item">
      <a href="{{ post.url }}">
        <h2>{{ post.data.title }}</h2>
        <p class="post-date">{{ post.date | date: "%Y-%m-%d" }}</p>
      </a>
    </div>
  {% endfor %}
</div>