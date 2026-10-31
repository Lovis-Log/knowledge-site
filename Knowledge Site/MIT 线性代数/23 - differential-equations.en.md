---
slug: "23-differential-equations"
title: "Differential Equations and the Matrix Exponential e^{At}"
summary: "The solution of du/dt = Au is a combination of eigenvectors times exponentials; SΛS⁻¹ decouples the system, giving the matrix exponential and a stability test based on the real parts of eigenvalues."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "differential-equations"
  - "matrix-exponential"
  - "eigenvalues"
sources:
  - kind: "video"
    title: "23. Differential Equations and exp(At)"
    url: "https://www.youtube.com/watch?v=IZqwi0wJovM"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## From discrete to continuous

The previous lecture solved $u_{k+1}=Au_k$, with $\lambda^k$ in the answer. This one solves

$$
\frac{du}{dt} = Au
$$

Solutions of constant-coefficient linear equations are **exponentials**, so $e^{\lambda t}$ appears. The two theories run in parallel: powers become exponentials, and eigenvalues still decide the behavior.

## A complete two-dimensional example

Let

$$
A=\begin{bmatrix}-1&2\\1&-2\end{bmatrix},
\qquad
u(0)=\begin{bmatrix}1\\0\end{bmatrix}
$$

### Eigenvalues first

The matrix is singular — the second column is $-2$ times the first — so $\lambda_1=0$. The trace is $-3$, so $\lambda_2=-3$.

The characteristic polynomial confirms it:

$$
\det(A-\lambda I)
=
\begin{vmatrix}-1-\lambda&2\\1&-2-\lambda\end{vmatrix}
=
\lambda^2+3\lambda
=
\lambda(\lambda+3)
$$

### Then eigenvectors

For $\lambda=0$, the null space satisfies $-u_1+2u_2=0$, so take

$$
x_1=\begin{bmatrix}2\\1\end{bmatrix}
$$

For $\lambda=-3$, solve $(A+3I)x=0$ with

$$
A+3I=\begin{bmatrix}2&2\\1&1\end{bmatrix}
$$

whose null space is spanned by

$$
x_2=\begin{bmatrix}1\\-1\end{bmatrix}
$$

(using $[-1,1]$ is equally fine).

### The general solution

The two pure exponential solutions are $e^{0t}x_1$ and $e^{-3t}x_2$, and the general solution is their combination:

$$
u(t)=c_1 e^{0t}\begin{bmatrix}2\\1\end{bmatrix}
+
c_2 e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}
$$

Why does it solve the equation? Differentiate the first term: $\lambda_1 e^{\lambda_1 t}x_1$. On the other side, $Au$ contains $e^{\lambda_1 t}Ax_1=\lambda_1 e^{\lambda_1 t}x_1$. The two sides match; the second term works the same way.

### Fixing the coefficients

At $t=0$:

$$
c_1\begin{bmatrix}2\\1\end{bmatrix}
+
c_2\begin{bmatrix}1\\-1\end{bmatrix}
=
\begin{bmatrix}1\\0\end{bmatrix}
$$

so

$$
2c_1+c_2=1, \qquad c_1-c_2=0
$$

Hence $c_1=c_2=\frac13$, and

$$
u(t)=\frac13\begin{bmatrix}2\\1\end{bmatrix}
+
\frac13 e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}
$$

### Reading the answer

- The first term never changes: a **steady state**.
- The second decays as $e^{-3t}$ and disappears.
- As $t\to\infty$, $u\to\left[\frac23,\frac13\right]^T$. Part of the initial $[1,0]$ has flowed into the second component.

The eigenvalues predicted this at the outset: a zero eigenvalue produces the steady state, a negative one produces decay.

## Stability, steady state, blow-up

| Behavior | Eigenvalue condition | Long-term outcome |
| --- | --- | --- |
| Stable | $\operatorname{Re}\lambda<0$ for all | $u(t)\to0$ |
| Steady state | One $\lambda=0$, others $\operatorname{Re}\lambda<0$ | Converges to a nonzero constant vector |
| Blow-up | Any $\operatorname{Re}\lambda>0$ | At least one component grows exponentially |

### Why the real part, not the modulus

If $\lambda=-3+6i$, then

$$
e^{\lambda t}=e^{-3t}e^{6i t}
$$

and $e^{6it}=\cos 6t+i\sin 6t$ has modulus 1, circling the unit circle. Only the real part $-3$ decides growth or decay; the imaginary part produces oscillation.

So:

- For difference equations, the stable region is the **unit disk** ($|\lambda|<1$).
- For differential equations, it is the **left half-plane** ($\operatorname{Re}\lambda<0$).

### A quick test for $2 \times 2$

Both eigenvalues have negative real part exactly when

$$
\operatorname{tr}A<0 \quad \text{and} \quad \det A>0
$$

The trace is the sum and the determinant is the product. Two numbers with negative real parts have a negative sum and a positive product; the complex-conjugate case behaves the same way.

One condition alone is not enough. Counterexample:

$$
\begin{bmatrix}-2&0\\0&1\end{bmatrix}
$$

The trace is $-1<0$, but the eigenvalues are $-2$ and $1$, so the system blows up. The determinant condition is essential.

## Decoupling with $S$ and $\Lambda$

Substitute $u=Sv$ into $\frac{du}{dt}=Au$:

$$
S\frac{dv}{dt}=ASv
$$

Left-multiply by $S^{-1}$:

$$
\frac{dv}{dt}=S^{-1}AS\,v=\Lambda v
$$

The system becomes $n$ independent equations:

$$
\frac{dv_i}{dt}=\lambda_i v_i
$$

Each solves as $v_i(t)=e^{\lambda_i t}v_i(0)$, so

$$
v(t)=e^{\Lambda t}v(0)
$$

and in the original variables

$$
u(t)=S e^{\Lambda t}S^{-1}u(0)
$$

This is why the columns of $S$ must be eigenvectors: **in the eigenvector basis the system has no coupling**.

## The matrix exponential

### Definition

Move the scalar power series to matrices:

$$
e^{At}=I+At+\frac{(At)^2}{2!}+\frac{(At)^3}{3!}+\cdots
$$

The series converges for every matrix and every $t$, because the factorial in the denominator grows fast enough.

### Relation to diagonalization

Substitute $A=S\Lambda S^{-1}$ into each term:

$$
(At)^k=S(\Lambda t)^k S^{-1}
$$

Factor $S$ out of the whole series on the left and $S^{-1}$ on the right; what remains is

$$
I+\Lambda t+\frac{(\Lambda t)^2}{2!}+\cdots=e^{\Lambda t}
$$

Therefore

$$
e^{At}=S e^{\Lambda t}S^{-1}
$$

The exponential of a diagonal matrix is just the diagonal of scalar exponentials:

$$
e^{\Lambda t}=
\begin{bmatrix}
e^{\lambda_1 t} & & \\
& \ddots & \\
& & e^{\lambda_n t}
\end{bmatrix}
$$

### The assumption

This derivation requires $A$ to be diagonalizable. A matrix with too few eigenvectors has no $S^{-1}$ and needs Jordan form or another method. The lecture explicitly leaves that case aside.

## Turning a higher-order equation into a first-order system

Consider

$$
y''+by'+ky=0
$$

Let

$$
u=\begin{bmatrix}y'\\y\end{bmatrix}
$$

Then

$$
u'=\begin{bmatrix}y''\\y'\end{bmatrix}
=
\begin{bmatrix}-b&-k\\1&0\end{bmatrix}
\begin{bmatrix}y'\\y\end{bmatrix}
$$

The first row comes from the equation; the second is the identity $y'=y'$. The eigenvalues satisfy

$$
\lambda^2+b\lambda+k=0
$$

which is the original characteristic equation. The trick generalizes to any order: the coefficient row goes first, and shifted identity rows fill the rest.

## Core review

- The solution of $\frac{du}{dt}=Au$ is a combination of eigenvectors times $e^{\lambda t}$.
- The coefficients come from the initial condition via $Sc=u(0)$.
- Stability is about the real part: all negative decays, one zero and the rest negative gives a steady state, any positive blows up.
- The $2\times2$ stability test is negative trace and positive determinant.
- In the eigenvector basis the system decouples, giving $u=Se^{\Lambda t}S^{-1}u(0)$.
- The matrix exponential is defined by a power series, and $e^{At}=Se^{\Lambda t}S^{-1}$ when $A$ diagonalizes.

## Common misconceptions

1. **Using the modulus for continuous-time stability.** Look at the real part; the modulus belongs to discrete time.
2. **Ignoring the imaginary part.** It does not change growth, but it produces oscillation rather than monotone decay.
3. **Checking only a negative trace.** The determinant must be positive as well.
4. **Treating $e^{At}$ as elementwise exponentiation.** It is not $e^{a_{ij}t}$ entry by entry.
5. **Forgetting the initial condition.** Eigenvalues determine the type of behavior; the initial vector determines how much of each mode is present.

## Check your understanding

1. Why does $\lambda=0$ produce a steady state rather than decay?
2. If the eigenvalues are $-1\pm4i$, does the solution blow up? Does it oscillate?
3. Use trace and determinant to decide whether $\begin{bmatrix}-1&2\\1&-2\end{bmatrix}$ is stable.
4. Write the first-order system and characteristic equation for $y''+3y'+2y=0$.
5. In the derivation of $e^{At}=Se^{\Lambda t}S^{-1}$, which step uses invertibility of $S$?

## How this connects

The previous lecture handled discrete time; this one handles continuous time. The course next turns to symmetric matrices: their eigenvalues are real and their eigenvectors orthogonal, so they always diagonalize, and the decomposition is orthogonal. That resolves a large part of the chapter's "bad cases".
