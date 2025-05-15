---
title: Thought Pond
layout: layout.njk
---
<div class="post-list">
  {% for post in collections.thoughts reversed %}
    <div class="post-item">
      <a href="{{ post.url }}">
        <h2>{{ post.data.title }}</h2>
        <div class="date">{{ post.date | date: "%Y-%m-%d" }}</div>
      </a>
    </div>
  {% endfor %}
</div>