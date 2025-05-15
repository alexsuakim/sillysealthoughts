---
title: Thought Pond
layout: layout.njk
---
<div class="post-list">
    {% for post in collections.thoughts reversed %}
    <a href="{{ post.url }}" class="post-card-link">
        <div class="post-card">
        <div class="post-title">{{ post.data.title }}</div>
        <p class="post-date">{{ post.date | date: "%Y-%m-%d" }}</p>
        </div>
    </a>
    {% endfor %}
</div>