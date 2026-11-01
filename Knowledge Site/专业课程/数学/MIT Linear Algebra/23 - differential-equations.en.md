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

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Systems $\mathrm{d}u/\mathrm{d}t=Au$ |
| 3:00 | The matrix structure and its eigenvalues |
| 6:13 | Steady states correspond to $\lambda=0$ |
| 9:23 | Solutions are combinations of $e^{\lambda t}x$ |
| 12:51 | Negative eigenvalues decay |
| 15:59 | Computing $u(\infty)$ |
| 19:04 | Stability requires $\operatorname{Re}\lambda<0$ |
| 22:18 | Stability conditions for 2×2 systems |
| 25:21 | The trace-determinant criterion |
| 28:37 | Coupled systems |
| 32:04 | $u(t)=Se^{\Lambda t}S^{-1}u(0)$ |
| 35:10 | The Taylor series for $e^{At}$ |
| 38:28 | When the series converges |
| 41:29 | Computing $e^{At}$ with $S$ and $\Lambda$ |
| 44:47 | Diagonalization reduces to scalar exponentials |
| 47:57 | Higher-order equations become first-order systems |


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

**1. Why does $\lambda=0$ produce a steady state rather than decay?**

Reference answer: The corresponding mode is $e^{0\cdot t}x=e^{0}x=x$, so $e^{\lambda t}=1$ for all $t$ and neither magnitude nor direction changes. It lies in the nullspace ($Ax=0$), so the mode is preserved as a constant term. Decay requires $\operatorname{Re}\lambda<0$; $\lambda=0$ sits exactly on the boundary between stability and divergence.

**2. If the eigenvalues are $-1\pm4i$, does the solution blow up? Does it oscillate?**

Reference answer: It does not blow up; it oscillates. For complex eigenvalues,
$$
e^{(-1+4i)t}=e^{-t}e^{4it}=e^{-t}(\cos 4t+i\sin 4t),
$$
whose modulus is $e^{-t}$; the real part $-1<0$ drives it to zero. The imaginary part $\pm4$ only rotates the solution at angular frequency $4$, producing oscillation without changing the growth trend. The solution is a decaying spiral.

**3. Use trace and determinant to decide whether $\begin{bmatrix}-1&2\\1&-2\end{bmatrix}$ is stable.**

Reference answer: $\operatorname{tr}A=-1+(-2)=-3<0$ and $\det A=(-1)(-2)-2\cdot1=2-2=0$. The stability test requires $\operatorname{tr}<0$ **and** $\det>0$; here $\det=0$, so the test fails and the system is **not asymptotically stable**. Computing directly: the characteristic polynomial is $\lambda^2+3\lambda=\lambda(\lambda+3)$, so $\lambda_1=0$ and $\lambda_2=-3$. The zero eigenvalue gives a steady state and the negative one decays, so the solution stays bounded and converges to a nonzero steady vector (in the text, $\left[\tfrac23,\tfrac13\right]^T$) rather than to zero.

**4. Write the first-order system and characteristic equation for $y''+3y'+2y=0$.**

Reference answer: Set $u=\begin{bmatrix}y'\\y\end{bmatrix}$; then
$$
u'=\begin{bmatrix}y''\\y'\end{bmatrix}
=
\begin{bmatrix}-3&-2\\1&0\end{bmatrix}
\begin{bmatrix}y'\\y\end{bmatrix}.
$$
The characteristic equation is
$$
\det\begin{bmatrix}-3-\lambda&-2\\1&-\lambda\end{bmatrix}
=\lambda^2+3\lambda+2=(\lambda+1)(\lambda+2)=0,
$$
so $\lambda_1=-1$, $\lambda_2=-2$. Both are negative, and the solution decays monotonically to zero.

**5. In the derivation of $e^{At}=Se^{\Lambda t}S^{-1}$, which step uses invertibility of $S$?**

Reference answer: The very first step writes $A=S\Lambda S^{-1}$, which needs $S^{-1}$ to exist — equivalently, $A$ must have $n$ linearly independent eigenvectors. Substituting into the power series gives $(At)^k=S(\Lambda t)^kS^{-1}$, so the adjacent factors $S^{-1}S$ cancel and the series collapses to $S\left(\sum(\Lambda t)^k/k!\right)S^{-1}$. Without diagonalizability there is no such $S$, and one must use Jordan form or another method.

## How this connects

The previous lecture handled discrete time; this one handles continuous time. The course next turns to symmetric matrices: their eigenvalues are real and their eigenvectors orthogonal, so they always diagonalize, and the decomposition is orthogonal. That resolves a large part of the chapter's "bad cases".
