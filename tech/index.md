---
title: Tech
layout: layout.njk
---
<div class="post-list">
  {% for post in collections.tech %}
    <div class="post-item">
      <div class="post-text">
        <div class="post-title">{{ post.data.title }}</div>
        <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
      </div>
    </div>
  {% endfor %}
</div>