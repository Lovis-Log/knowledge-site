"use client";

import { useState, type KeyboardEvent } from "react";
import type { Book, Chapter, ChapterGroup } from "@/content/types";
import { ChapterList } from "./chapter-list";
import { UiText } from "./ui-text";

type Group = ChapterGroup & { chapters: Chapter[] };

export function ChapterGroupTabs({ book, groups }: { book: Book; groups: Group[] }) {
  const [selection, setSelection] = useState({ book: book.slug, group: groups[0]?.id });
  const active = groups.find((group) => selection.book === book.slug && group.id === selection.group) ?? groups[0];
  if (!active) return null;

  const choose = (index: number) => setSelection({ book: book.slug, group: groups[index].id });
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + groups.length) % groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <>
      <div className="chapter-tabs" role="tablist" aria-label="课程目录 / Course contents">
        {groups.map((group, index) => (
          <button
            type="button"
            role="tab"
            key={group.id}
            id={`${book.slug}-tab-${group.id}`}
            aria-controls={`${book.slug}-panel-${group.id}`}
            aria-selected={active.id === group.id}
            tabIndex={active.id === group.id ? 0 : -1}
            className="chapter-tabs__button"
            onClick={() => choose(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <UiText zh={group.heading} en={group.id === "course" ? "Course contents" : group.id === "homework" ? "Homework contents" : group.heading} />
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`${book.slug}-panel-${group.id}`}
          aria-labelledby={`${book.slug}-tab-${group.id}`}
          hidden={active.id !== group.id}
          tabIndex={0}
        >
          <ChapterList book={book} chapters={group.chapters} />
        </div>
      ))}
    </>
  );
}
