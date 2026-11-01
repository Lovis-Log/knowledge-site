---
slug: "08-git-and-github"
title: "Git and GitHub: Version History and a Remote Backup"
summary: "Understand Git as snapshots, tell repository, staging, commit, push, pull and clone apart, go from installation and authentication to pushing a local project to GitHub, and keep virtual environments and secrets out with .gitignore."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - git
  - github
  - version-control
  - workflow
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 8 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=15004s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## What this chapter covers

Writing code raises two questions: how do you get back to a working version after breaking something, and how do you hand the code to someone else. Git answers the first; GitHub answers the second. This chapter covers the part used every day — roughly 80–90% of what you need — and leaves the rest to a cheat sheet.

This is chapter 8 of the long course, covering 4:10:04–4:44:33.

## Timeline

| Time | Topic |
| --- | --- |
| 4:10:04 | What Git and GitHub each are |
| 4:12:33 | The problem version control solves, and the core concepts |
| 4:13:57 | Repository, staging, commit, push, pull, clone |
| 4:15:29 | Checking for and installing Git |
| 4:16:52 | The minimal loop: init → add → commit → push |
| 4:18:50 | Creating a GitHub account and configuring identity |
| 4:20:30 | Authentication: GitHub CLI and SSH |
| 4:22:40 | Cloning someone else's repository |
| 4:28:20 | Creating a repository and a `.gitignore` |
| 4:32:37 | Pushing a local project to GitHub, command by command |
| 4:36:36 | The daily loop: status → add → commit → push |
| 4:38:08 | The VS Code graphical interface |

## Life without version control

The lecture recreates a scene almost everyone recognises: the code breaks, so you copy it and call the copy `final.py`; it breaks again, so you get `final_v2.py`, then `final_actually_final.py`. The names grow longer and nobody remembers which one still works.

Git solves this. It takes snapshots of the code, and each snapshot records **what changed, who changed it, when, and why**. If Monday's price was 20%, Tuesday's client asked for a 25% markup, and Wednesday's asked to go back to 20%, returning to Monday is a single step with Git.

Changing one digit by hand is easy; recovering a large project that suddenly stops running is where this becomes essential.

## Six words to know

- **Repository**: a project tracked by Git.
- **Staging**: choosing which changes go into this commit, like picking items before sealing a box.
- **Commit**: actually taking the snapshot, with a message.
- **Push**: uploading commits to GitHub.
- **Pull**: downloading changes someone else pushed.
- **Clone**: downloading an entire repository to your machine.

The lecture puts it plainly: the vocabulary sounds technical, but underneath it is saving files, uploading and downloading — each with its own name.

Also keep Git and GitHub apart: **Git is the version-control program on your computer; GitHub is a website that hosts repositories**. Git works without GitHub, but sharing and collaboration are much harder.

## Install and configure

First check whether Git is already present:

```bash
git --version
```

If you see a version number, skip the install. On Windows, download the installer from git-scm.com; on macOS, use Homebrew or let the system install the Xcode Command Line Tools on first use.

Then set your identity once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

These values are written into every commit, so anyone reading the history can see who made the change. Use the same name and email as your GitHub account.

## Authentication: letting your machine push

Local Git needs to know which GitHub account it belongs to. The lecture recommends the GitHub CLI, which wraps authentication into a few commands.

On macOS install with `brew install gh`; on Windows download the installer from cli.github.com. Then:

```bash
gh auth login
```

Choose `GitHub.com`, pick a protocol (SSH is recommended), authorise in the browser and paste the one-time code the terminal shows. This is a one-time setup.

HTTPS tokens and SSH keys work too, but require more configuration. The advice is to get the CLI working first.

## Cloning someone else's repository

When you find example code you want to run, open a terminal in the folder where you keep projects and run:

```bash
git clone https://github.com/openai/openai-quickstart-python.git
```

On both macOS and Windows you can right-click a folder and choose "Open in Terminal" or "New Terminal at Folder" to avoid `cd`. After cloning, the entire repository and its commit history are local.

To open the project in VS Code from the terminal:

```bash
code .
```

The first time, run `Shell Command: Install 'code' command in PATH` from the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

## `.gitignore`: files that should never be pushed

Before pushing, exclude files that do not belong in the repository. The clearest case is the virtual environment: the one in the lecture is 270 MB of interpreters and dependencies. Uploading it is slow and pointless — anyone can rebuild it from `requirements.txt` or `pyproject.toml`.

Create `.gitignore` at the project root:

```text
.venv/
__pycache__/
.env
.DS_Store
*.pyc
```

The rule: **environments, caches, secrets and system files are never tracked**. `.env` must be listed, or your keys will end up on GitHub.

## Pushing a local project to GitHub

On GitHub, click "New repository", choose a name and visibility. The lecture stresses: **default to private**, switch to public only when you genuinely want the world to see it; collaborators can be invited to a private repository.

Then, in the project folder:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Line by line:

- `git init` creates the repository, including the hidden `.git/` folder that holds all history.
- `git add .` stages every current change; `.` means "everything". Name files individually only when you want a partial commit.
- `git commit -m "..."` takes the snapshot and records the message.
- `git branch -M main` renames the default branch to `main`, the current convention.
- `git remote add origin <url>` links the local repository to the GitHub one; `origin` is the conventional name for that remote.
- `git push -u origin main` uploads and, with `-u`, remembers the default so later pushes are just `git push`.

The first run looks like a lot, but 80–90% of it is one-time setup. Once installed, authenticated and linked, daily work is four steps.

## The daily loop

```bash
git status
git add .
git commit -m "add grand total to report"
git push
```

`git status` shows what changed (untracked, modified, staged) so you can decide what to commit. After pushing, GitHub shows exactly which lines changed — that is where the ability to roll back comes from.

## The VS Code interface

The lecture's own daily workflow uses the Source Control panel:

- the icon shows how many changes exist;
- type a message and click Commit, equivalent to `git commit -m`;
- "Commit & Push" does both in one click;
- the first time, if no remote exists, the panel offers "Publish Branch" and walks you through creating a public or private repository.

There is a shortcut worth knowing: initialise a repository in an empty folder, add a README, and click Commit & Push; VS Code will offer to create the matching GitHub repository without visiting the website first.

With GitHub Copilot installed, commit messages can be generated from the diff — the lecture admits that writing commit messages is one of the harder parts of being a developer.

## Takeaways

- Git snapshots your code; GitHub hosts those snapshots and enables collaboration.
- Six core words: repository, staging, commit, push, pull, clone.
- One-time setup: install, `user.name`/`user.email`, `gh auth login`.
- Five commands push a project: `init`, `add`, `commit`, `branch -M main`, `remote add` plus `push -u`.
- Daily work is `status → add → commit → push`, or two clicks in VS Code.
- `.gitignore` must exclude the virtual environment, caches and `.env`.
- Keep repositories private by default.

## Comprehension check

**1. What is the difference between Git and GitHub? Can you use just one?**

Reference answer: Git is the local version-control program that records commits, branches and history; GitHub is an online service that hosts Git repositories for backup, sharing and collaboration. Git alone is fully usable — commits stay on your machine and you can branch, merge and roll back locally — but there is no shared remote copy for another machine or collaborator. GitHub alone is not usable, because pushing and pulling are performed by local Git.

**2. What do `git add` and `git commit` each do, and why are there two steps?**

Reference answer: `git add` places selected changes in the staging area, deciding which files and which edits belong to the next commit. `git commit` freezes the staged content into a snapshot along with the message, author and time. The split allows precise commits: if you changed three files but only two belong together, stage those two and commit, and the history stays readable. `git add .` is the shortcut for "stage everything".

**3. Why must `.venv/` and `.env` be listed in `.gitignore`?**

Reference answer: `.venv/` contains a copy of the interpreter and dependencies, often hundreds of megabytes, and it cannot be reused across machines or Python versions; dependencies should be rebuilt from `requirements.txt` or `pyproject.toml`. `.env` holds API keys, database passwords and other secrets; once pushed to GitHub, especially to a public repository, anyone who can see the repository can take them, risking data loss or unexpected bills. Ignoring `.env` keeps the keys local.

**4. What does the `-u` in `git push -u origin main` do?**

Reference answer: `-u` (`--set-upstream`) links the local `main` branch to `origin/main` and records that link. Afterwards, on `main`, plain `git push` and `git pull` know which remote branch to use, so you do not repeat `origin main`. It only needs to be set on the first push.

**5. You made several local commits but forgot to run `git remote add origin`. What happens when you run `git push`, and how do you fix it?**

Reference answer: Git reports that no push destination is configured (something like `fatal: No configured push destination`). The commits are safe locally. Add the remote and push:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

If the remote already has content (for example a README created with the repository), pull it in first with `git pull --rebase origin main`, then push.

**6. You committed a working version on Monday and broke the code on Wednesday. How do you get back to Monday, and does Wednesday's commit disappear?**

Reference answer: find Monday's hash with `git log`, then inspect it with `git checkout <hash>`, or undo the change with `git revert`. To restore the working tree to that state without rewriting history, use `git checkout <hash> -- .` or `git restore`. Wednesday's commit **still exists in the history**: ordinary commands do not delete commits, which is precisely why you no longer need `final_v2.py`. Only operations like `git reset --hard` move the branch pointer so the commit leaves the current history, and even then the objects remain locally for a while.

## How it connects

The previous chapter organized code with classes; this one adds version history and a remote backup. The next chapter covers the other two everyday essentials: `.env` to move secrets out of the code, Ruff to standardize style, and uv to replace pip for dependency management. Together the three chapters form a project skeleton you can hand to a client.
