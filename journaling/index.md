---
title: journals
layout: layout.njk
---
<div class="post-list">
    {% for post in collections.journaling reversed %}
    {% unless post.inputPath contains "/index.md" %}
        <a href="{{ post.url }}" class="post-card-link">
        <div class="post-card">
            <div class="post-title">{{ post.data.title }}</div>
            <p class="post-date">{{ post.date | readableDate }}</p>
        </div>
        </a>
    {% endunless %}
    {% endfor %}
</div>