---
title: Thoughts
layout: layout.njk
---

<h1>🌊 Thought Pond</h1>

<ul>
  {% for post in collections.thoughts %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    </li>
  {% endfor %}
</ul>
