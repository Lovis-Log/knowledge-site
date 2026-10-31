import type { Book } from "@/content/types";

export const mitLinearAlgebra: Book = {
  slug: "mit-linear-algebra",
  title: "MIT 18.06 线性代数学习笔记",
  subtitle: "Gilbert Strang · Spring 2005",
  description:
    "按 Strang 的讲法重写 18.06 的主线：从方程组的三种视角，到消元、矩阵乘法、四个基本子空间。重点是几何直觉，公式只是把直觉写下来。",
  updatedAt: "2026-10-27",
  chapters: [
    {
      slug: "01-geometry-of-equations",
      number: 1,
      updatedAt: "2026-10-27",
      sources: [
        {
          kind: "video",
          title: "Lecture 1: The Geometry of Linear Equations",
          url: "https://www.youtube.com/watch?v=J7DzL2_Na80",
          author: "Gilbert Strang, MIT OpenCourseWare",
          publishedAt: "2019-09-25",
        },
        {
          kind: "article",
          title: "MIT OCW 18.06 Linear Algebra",
          url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
        },
      ],
      versions: {
        en: {
          title: "The Geometry of Linear Equations",
          summary:
            "One system, three pictures: rows as intersecting lines, columns as vector combinations, and the matrix as a linear map. The column picture is the one that generalizes.",
          body: `## Three views of one equation

Every linear system $A\\mathbf{x} = \\mathbf{b}$ can be read three ways, and Strang insists you see all of them at once.

### Row picture

Each equation is a line (or a plane). The solution is where they meet.

$$
2x_1 - x_2 = 0, \\qquad -x_1 + 2x_2 = 3
$$

For two equations in two unknowns, intersecting lines are easy to see — and hard to generalize.

### Column picture

Rewrite the same system as a combination of columns:

$$
x_1 \\begin{bmatrix} 2 \\\\ -1 \\end{bmatrix}
+ x_2 \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix}
= \\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix}
$$

The question becomes: **which combination of the columns produces $\\mathbf{b}$?** This view survives in any number of dimensions, and it leads directly to the idea of a vector space.

### Matrix picture

$A\\mathbf{x}$ is a linear combination of the columns of $A$, with the entries of $\\mathbf{x}$ as weights. That one sentence explains matrix-vector multiplication and, later, the column space.

| View | Object | Generalizes to |
| --- | --- | --- |
| Row | intersecting lines | hard |
| Column | combination of vectors | any dimension |
| Matrix | linear map | any dimension |

## A first look at singularity

If the two columns point along the same line, no combination can reach a $\\mathbf{b}$ off that line. The matrix is **singular**, and the column picture shows why immediately — without any algebra.

![A linear map sending a square grid to a sheared grid](/images/linear-map.svg)

## Takeaway

Use the column picture for intuition and the row picture for algorithms. Elimination, the subject of the next chapter, is that algorithm.
`,
        },
      },
    },
    {
      slug: "02-elimination-with-matrices",
      number: 2,
      updatedAt: "2026-10-26",
      sources: [
        {
          kind: "video",
          title: "Lecture 2: Elimination with Matrices",
          url: "https://www.youtube.com/watch?v=QVKj3LADCnA",
          author: "Gilbert Strang, MIT OpenCourseWare",
          publishedAt: "2019-09-25",
        },
      ],
      versions: {
        en: {
          title: "Elimination with Matrices",
          summary:
            "Elimination is repeated row operations until the matrix is upper triangular; each step is a linear map, and the multipliers are the entries of L.",
          body: `## Elimination as a sequence of maps

Start with an augmented matrix and use the first pivot to clear everything below it, then move to the second column.

$$
\\left[\\begin{array}{cc|c}
1 & 2 & 5 \\\\
3 & 8 & 17
\\end{array}\\right]
\\xrightarrow{\\;R_2 - 3R_1\\;}
\\left[\\begin{array}{cc|c}
1 & 2 & 5 \\\\
0 & 2 & 2
\\end{array}\\right]
$$

The multiplier is $3$. Back substitution then gives $x_2 = 1$ and $x_1 = 3$.

### What can go wrong

| Situation | Consequence |
| --- | --- |
| A pivot is zero but a lower entry is not | swap rows; the matrix is still invertible |
| A whole column below the pivot is zero | no unique solution |
| Two rows become identical | singular matrix |

### Elimination in code

\`\`\`python
def eliminate(A, b):
    n = len(A)
    for k in range(n):
        pivot = A[k][k]
        if pivot == 0:
            raise ValueError(f"zero pivot at row {k}")
        for i in range(k + 1, n):
            factor = A[i][k] / pivot
            for j in range(k, n):
                A[i][j] -= factor * A[k][j]
            b[i] -= factor * b[k]
    return A, b
\`\`\`

> The multipliers are not bookkeeping. Collected in a lower triangular matrix $L$, they reconstruct the original $A$ as $A = LU$ — which is the next chapter.

## Why it matters

Elimination turns a general system into a triangular one that can be solved in a single pass. Every later algorithm — determinants, inverses, least squares — is a variation on this idea.
`,
        },
      },
    },
    {
      slug: "03-multiplication-and-inverses",
      number: 3,
      updatedAt: "2026-10-25",
      sources: [
        {
          kind: "video",
          title: "Lecture 3: Multiplication and Inverse Matrices",
          url: "https://www.youtube.com/watch?v=FX4C-JpTFgY",
          author: "Gilbert Strang, MIT OpenCourseWare",
          publishedAt: "2019-09-25",
        },
      ],
      versions: {
        en: {
          title: "Multiplication and Inverse Matrices",
          summary:
            "Matrix multiplication is a composition of linear maps; an inverse exists exactly when that map is reversible, and Gauss-Jordan computes it by elimination.",
          body: `## Four ways to multiply

For $C = AB$, the entry $c_{ij}$ is the dot product of row $i$ of $A$ with column $j$ of $B$:

$$
c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}
$$

But the more useful reading is **columns of $C$ are combinations of columns of $A$**:

$$
C = A B = A \\begin{bmatrix} \\mathbf{b}_1 & \\mathbf{b}_2 & \\cdots \\end{bmatrix}
= \\begin{bmatrix} A\\mathbf{b}_1 & A\\mathbf{b}_2 & \\cdots \\end{bmatrix}
$$

This is why matrix multiplication is composition: apply $B$, then apply $A$.

## When does an inverse exist?

$A^{-1}$ exists exactly when $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. If two different vectors mapped to the same output, the map cannot be undone.

For a $2 \\times 2$ matrix:

$$
A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix},
\\qquad
A^{-1} = \\frac{1}{ad - bc}
\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}
$$

The quantity $ad - bc$ is the determinant: zero means the columns are dependent, and the inverse does not exist.

## Gauss-Jordan

To invert $A$, eliminate on the augmented matrix $[A \\mid I]$ until the left side becomes $I$:

$$
[A \\mid I] \\;\\longrightarrow\\; [I \\mid A^{-1}]
$$

\`\`\`python
def inverse(A):
    n = len(A)
    M = [row[:] + [1.0 if i == j else 0.0 for j in range(n)]
         for i, row in enumerate(A)]
    # forward elimination, then back substitution ...
    return M
\`\`\`

> If elimination requires a row swap and none is possible, the matrix is singular — the same fact the determinant reports.
`,
        },
      },
    },
  ],
};
