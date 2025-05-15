---
title: Tech
layout: layout.njk
---

<h1>🧠 Tech Splash Zone</h1>

<ul>
  {% for post in collections.tech %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    </li>
  {% endfor %}
</ul>
