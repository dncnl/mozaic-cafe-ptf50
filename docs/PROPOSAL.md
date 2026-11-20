# Project proposal (draft): Mozaic Mood Matcher

**AI for Our Community: an AI-powered menu matcher for Mozaic Cafe, Bar & Kitchen**

## Target entity

Mozaic Cafe, Bar & Kitchen, Mac Arthur Highway (near St. Mutien College), Dau, Mabalacat, Pampanga. It is one room that runs as a café by day, a kitchen all day and a bar at night, and it is open daily from 10 AM to 12 AM.

## The problem

A first-time customer faces **98 items across three menus**, and most of the café drinks have no description. Choosing something that fits their taste, budget and restrictions ("no pork", "no coffee") means scrolling the whole menu or asking busy staff.

## Intended users

- **Walk-in and first-time customers**, on their own phones via a QR code at the counter
- **Groups (barkada)** working out a shared order within a budget
- **Staff**, who can use it to answer "what do you recommend?" consistently

## Proposed AI feature and PTF50 tool

**Transformers.js, text similarity (sentence embeddings).** The customer types something like "sweet and cold, no coffee, under ₱150" or "pulutan for 4, ₱800", in English or Taglish. A small language model, all-MiniLM-L6-v2, **runs in the browser** and compares the meaning of the request with every menu item. Simple rules apply the hard limits exactly: budget, group size and exclusions.

For groups, the app suggests a spread that fits the budget.

**Quick test (spec §02):** without the model nothing ranks "something refreshing" or "comfort food", so the feature only works because of it.

## Expected benefits

- Customers find something they'll like faster and with more confidence.
- Staff answer fewer repeated "what's good?" questions.
- It costs ₱0 to run: no API, no server and no subscription. It works offline after the first visit.
- Privacy by design: what customers type never leaves their phone.
