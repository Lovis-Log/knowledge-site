---
slug: "24-quiz-2-review"
title: "Quiz 2 Review: Tying Orthogonality, Determinants, and Eigenvalues Together"
summary: "Seven problem types: projection matrices, projection difference equations, least squares, Gram-Schmidt, eigenvalue identities, tridiagonal recurrences, and a family of matrices."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "exam-review"
  - "projection"
  - "eigenvalues"
sources:
  - kind: "video"
    title: "24b. Quiz 2 Review"
    url: "https://www.youtube.com/watch?v=QuZL5IKpO_U"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## Scope

The quiz covers three blocks:

1. **Orthogonality**: $Q^TQ=I$, projections onto lines and subspaces, least squares, Gram-Schmidt.
2. **Determinants**: the three defining properties, their consequences, the big formula and cofactors, the inverse formula.
3. **Eigenvalues and eigenvectors** (6.1–6.2): $Ax=\lambda x$, the characteristic equation, diagonalization and powers.

Differential equations (6.3) are not on this quiz.

## Timeline

| Time | Topic |
| --- | --- |
| 0:09 | Scope of the review and exam logistics |
| 3:28 | Working through old exam problems |
| 6:34 | Eigenvalue questions |
| 9:41 | Problem type 1: projection onto a line |
| 13:02 | Expanding in eigenvectors |
| 16:03 | Problem type 3: least squares through the origin |
| 19:07 | The key point of least squares |
| 22:10 | Problem type 4: Gram-Schmidt |
| 25:17 | What a zero eigenvalue means |
| 28:22 | Problem type 6: the tridiagonal family |
| 31:39 | The determinant recurrence |
| 34:52 | Setting the recurrence to zero |
| 37:59 | Stability and the signs of $D_n$ |
| 41:12 | The matrix $A_3$ |
| 44:17 | Checking with the trace |
| 47:27 | The determinant of $A_4$ |


## Problem type 1: projection onto a line

**Problem:** For $a=(2,1,2)$, find the matrix $P$ that projects onto the line through $a$.

For a single-column matrix the formula is

$$
P=\frac{aa^T}{a^Ta}
$$

The denominator:

$$
a^Ta=4+1+4=9
$$

The numerator is the outer product:

$$
aa^T=
\begin{bmatrix}
4&2&4\\
2&1&2\\
4&2&4
\end{bmatrix}
$$

Hence

$$
P=\frac19
\begin{bmatrix}
4&2&4\\
2&1&2\\
4&2&4
\end{bmatrix}
$$

### Rank, eigenvalues, eigenvectors

- The rank is 1, since every column is a multiple of $a$.
- The column space is the line through $a$.
- Rank 1 means the null space is two-dimensional, so $\lambda=0$ has multiplicity two.
- The remaining eigenvalue comes from the trace: $\operatorname{tr}P=1$, so the third eigenvalue is 1.
- The eigenvector for $\lambda=1$ is $a$ itself: a vector on the line does not move under projection.

Equivalently, use $P^2=P$, which forces every eigenvalue to be 0 or 1.

## Problem type 2: a projection difference equation

**Problem:** Solve $u_{k+1}=Pu_k$ with $u_0=(9,9,0)$.

First step:

$$
u_1=Pu_0=a\frac{a^Tu_0}{a^Ta}
$$

The inner product:

$$
a^Tu_0=2\cdot9+1\cdot9+2\cdot0=27
$$

so

$$
u_1=\frac{27}{9}a=3a=\begin{bmatrix}6\\3\\6\end{bmatrix}
$$

The key observation: $u_1$ already lies on the line, and $P^2=P$, so projecting again changes nothing. Therefore

$$
u_k=\begin{bmatrix}6\\3\\6\end{bmatrix}\quad(k\ge1)
$$

### Contrast with a general matrix

For a general matrix, the full procedure is:

1. find the eigenvalues;
2. find the eigenvectors;
3. expand $u_0=c_1x_1+\cdots+c_nx_n$;
4. write $u_k=\sum c_i\lambda_i^k x_i$.

For a projection, two eigenvalues are zero, so those terms vanish immediately and only the $\lambda=1$ term remains.

## Problem type 3: least squares through the origin

**Problem:** Fit $y=Dt$ to $(1,4),(2,5),(3,8)$.

As a system:

$$
\begin{bmatrix}1\\2\\3\end{bmatrix}D
=
\begin{bmatrix}4\\5\\8\end{bmatrix}
$$

which has no solution, since the three points are not collinear. The least-squares solution satisfies the normal equation

$$
A^TA\hat D=A^Tb
$$

Compute:

$$
A^TA=1^2+2^2+3^2=14
$$

$$
A^Tb=1\cdot4+2\cdot5+3\cdot8=38
$$

so

$$
\hat D=\frac{38}{14}=\frac{19}{7}
$$

### Two pictures, not one

- **The $ty$-plane picture**: the three data points and the fitted line $y=\frac{19}{7}t$. Nothing is projected onto the line here.
- **The vector-space picture**: $b=(4,5,8)$ is projected onto the column space of $A$, which is the line spanned by $(1,2,3)$ in $\mathbb{R}^3$. The projection is $A\hat D$.

The word "projection" in least squares belongs to the second picture.

## Problem type 4: Gram-Schmidt

**Problem:** For $a_1=(1,2,3)$ and $a_2=(1,1,1)$, find an orthogonal basis of their plane.

Keep $a_1$ and subtract from $a_2$ its component along $a_1$:

$$
B=a_2-\frac{a_1^Ta_2}{a_1^Ta_1}a_1
$$

Compute:

$$
a_1^Ta_2=1+2+3=6,\qquad a_1^Ta_1=14
$$

$$
B=(1,1,1)-\frac{6}{14}(1,2,3)
=
\left(\frac47,\frac17,-\frac27\right)
$$

Check orthogonality:

$$
1\cdot\frac47+2\cdot\frac17+3\cdot\left(-\frac27\right)
=
\frac47+\frac27-\frac67=0
$$

Only orthogonality was requested; normalize by dividing by $\|B\|$ if an orthonormal basis is needed.

## Problem type 5: eigenvalue identities

Let a $4\times4$ matrix $A$ have eigenvalues $\lambda_1,\dots,\lambda_4$.

| Question | Answer | Reason |
| --- | --- | --- |
| When is $A$ invertible? | All $\lambda_i\ne0$ | A zero eigenvalue is equivalent to singularity |
| $\det(A^{-1})$ | $\dfrac{1}{\lambda_1\lambda_2\lambda_3\lambda_4}$ | $A^{-1}$ has eigenvalues $1/\lambda_i$ |
| $\operatorname{tr}(A+I)$ | $\lambda_1+\lambda_2+\lambda_3+\lambda_4+4$ | Adding $I$ shifts every eigenvalue by 1 |

All three follow from the two identities: eigenvalues sum to the trace and multiply to the determinant.

## Problem type 6: the tridiagonal recurrence

Let $A_n$ be the $n\times n$ tridiagonal matrix with ones on all three diagonals, and let $D_n=\det A_n$.

### The recurrence

Expand along the first row. The first 1 has cofactor $D_{n-1}$. The second 1 sits at $(1,2)$ with a minus sign; expanding its cofactor along the first column leaves $D_{n-2}$. Therefore

$$
D_n=D_{n-1}-D_{n-2}
$$

Initial values:

$$
D_1=1,\qquad D_2=\begin{vmatrix}1&1\\1&1\end{vmatrix}=0
$$

### A first-order system

With the vector $\begin{bmatrix}D_n\\D_{n-1}\end{bmatrix}$,

$$
\begin{bmatrix}D_n\\D_{n-1}\end{bmatrix}
=
\begin{bmatrix}1&-1\\1&0\end{bmatrix}
\begin{bmatrix}D_{n-1}\\D_{n-2}\end{bmatrix}
$$

### Eigenvalues

$$
\det\begin{bmatrix}1-\lambda&-1\\1&-\lambda\end{bmatrix}
=
\lambda^2-\lambda+1
$$

so

$$
\lambda=\frac{1\pm i\sqrt3}{2}=e^{\pm i\pi/3}
$$

Both eigenvalues have modulus 1, so $D_n$ neither converges nor blows up; it is periodic. Since $\lambda^6=1$, the sixth power of the matrix is the identity and the sequence has period six.

Contrast with Fibonacci: there the recurrence is $D_n=D_{n-1}+D_{n-2}$, the eigenvalues are real and one has modulus above 1, so the sequence grows exponentially. Here the minus sign places the eigenvalues on the unit circle, producing periodicity.

## Problem type 7: a family of matrices

Let

$$
A_3=\begin{bmatrix}0&1&0\\1&0&2\\0&2&0\end{bmatrix}
$$

The third column is twice the first, so the matrix is singular.

The characteristic polynomial:

$$
\det(A_3-\lambda I)=-\lambda^3+5\lambda=-\lambda(\lambda^2-5)
$$

so the eigenvalues are

$$
0,\ \sqrt5,\ -\sqrt5
$$

Their sum is 0, matching the trace.

Now let

$$
A_4=\begin{bmatrix}
0&1&0&0\\
1&0&2&0\\
0&2&0&3\\
0&0&3&0
\end{bmatrix}
$$

Cofactor expansion gives $\det A_4=9\ne0$, so $A_4$ is invertible. Its column space is all of $\mathbb{R}^4$, and the projection onto it is the identity matrix.

The lecture's conjecture: odd sizes are singular, even sizes are invertible, and the determinants follow a pattern.

## Core review

- Projection onto a line: $P=aa^T/a^Ta$, rank 1, eigenvalues 1 and 0.
- A projection difference equation reaches its fixed point after one step.
- Least squares: solve $A^TA\hat x=A^Tb$; the projection happens in the space where $b$ lives.
- Gram-Schmidt subtracts the component along directions already chosen.
- Eigenvalue identities: invertibility means no zero; inverses invert; adding $cI$ shifts.
- Tridiagonal recurrence: $D_n=D_{n-1}-D_{n-2}$, eigenvalues on the unit circle, period six.
- For a matrix family, decide invertibility first; the projection may then be trivial.

## Common misconceptions

1. **Projecting the data points onto the fitted line in least squares.** The projection is in vector space, not in the scatter plot.
2. **Skipping the subtraction in Gram-Schmidt.**
3. **Not checking eigenvalues against trace and determinant.** It is the fastest sanity check.
4. **Flipping the sign in the tridiagonal recurrence.** The minus comes from the $(1,2)$ position.
5. **Computing a projection matrix for a matrix family before checking invertibility.** If it is invertible, the answer is often trivial.

## Check your understanding

**1. Why is the null space of a rank-one projection $(n-1)$-dimensional?**

Reference answer: $P=\dfrac{aa^T}{a^Ta}$ has every column a multiple of $a$, so $\operatorname{rank}P=1$ (for $a\ne0$). By rank–nullity,
$$
\dim N(P)=n-\operatorname{rank}P=n-1 .
$$
Geometrically, $P$ projects onto the line $\operatorname{span}\{a\}$; only that direction survives, while the $(n-1)$-dimensional hyperplane perpendicular to $a$ is collapsed to zero. Correspondingly $\lambda=0$ has algebraic multiplicity $n-1$ and $\lambda=1$ has multiplicity 1.

**2. If $u_0$ already lies in the column space, how do $u_1$ and $u_0$ compare?**

Reference answer: Since $u_0\in C(P)=\operatorname{span}\{a\}$, projecting onto the column space leaves it unchanged, so $u_1=Pu_0=u_0$. Because $P^2=P$, nothing changes afterwards: $u_k=u_0$ for all $k\ge0$. In the eigenvector expansion, $u_0$ contains only the $\lambda=1$ component; the coefficients of the two $\lambda=0$ components are zero, so no decaying term remains.

**3. Solve the through-origin fit by the normal equation and interpret the units of $\hat D$.**

Reference answer: $A=(1,2,3)^T$, $b=(4,5,8)^T$. The normal equation $A^TA\hat D=A^Tb$ gives
$$
A^TA=1+4+9=14,\qquad A^Tb=1\cdot4+2\cdot5+3\cdot8=38,
$$
so $\hat D=\frac{38}{14}=\frac{19}{7}$. Its unit is "$y$ unit per $t$ unit": if $y$ is in metres and $t$ in seconds, $\hat D\approx2.71\ \mathrm{m/s}$, the slope (velocity) of the line. The through-origin model has no intercept and only this one parameter.

**4. Write out the first six determinants of the tridiagonal sequence.**

Reference answer: With $D_n=D_{n-1}-D_{n-2}$, $D_1=1$ and $D_2=0$:
$$
D_1=1,\quad D_2=0,\quad D_3=0-1=-1,\quad D_4=-1-0=-1,\quad D_5=-1-(-1)=0,\quad D_6=0-(-1)=1 .
$$
The sequence $1,0,-1,-1,0,1,\dots$ has period 6; $D_6=D_1=1$ agrees with the eigenvalues lying on the unit circle and satisfying $\lambda^6=1$.

**5. Why is the projection onto the column space of $A_4$ the identity?**

Reference answer: $A_4$ is $4\times4$ with $\det A_4=9\ne0$, so its four columns are linearly independent and its column space is all of $\mathbb{R}^4$. Every vector already lies in the column space, so projection changes nothing. In formula form,
$$
P=A(A^TA)^{-1}A^T=A\,A^{-1}(A^T)^{-1}A^T=I .
$$
More generally, for full column rank with $m\ge n$, $A(A^TA)^{-1}A^T$ projects onto $C(A)$; it equals $I$ exactly when $A$ is an invertible square matrix.

## How this connects

The review places orthogonality, determinants, and eigenvalues side by side. The next lectures turn to symmetric matrices and positive definiteness, where real eigenvalues, orthogonal eigenvectors, and quadratic forms all meet.
