---
slug: 22-uniform-limits-integrals
title: "一致极限：连续性的保持、完备性与积分交换"
summary: "证明连续函数的一致极限连续，把一致收敛改写为 sup 度量下的收敛，证明 C([a,b]) 完备，并用上下和证明积分可与一致极限交换。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, uniform-convergence, continuity, integration, metric-spaces]
sources:
  - kind: video
    title: "Lecture 21: Integrals and Derivatives under Uniform Convergence"
    url: https://www.youtube.com/watch?v=_4m8hYQ3cR0
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## 上节课留下的两个收敛

设区间 $I$ 上有一列函数 $f_n$ 与一个函数 $f$。

- **逐点收敛**：固定每个 $x$，数列 $f_n(x)$ 收敛到 $f(x)$。
- **一致收敛**：对每个 $\varepsilon>0$，存在 $N$，使得 $n\ge N$ 时

$$
|f_n(x)-f(x)|<\varepsilon
\quad\text{对一切 }x\in I\text{ 成立}.
$$

区别只在最后那句「对一切 $x$」：逐点收敛允许 $N$ 依赖 $x$，一致收敛不允许。

课程反复使用的反例是 $[0,1]$ 上的 $f_n(x)=x^n$。它逐点收敛到

$$
f(x)=
\begin{cases}
0,&0\le x<1,\\
1,&x=1.
\end{cases}
$$

每个 $f_n$ 都连续，极限 $f$ 却在 $1$ 处跳跃。为什么不一致？由介值定理，对每个 $n$ 都存在 $x_n$ 使 $x_n^n=\tfrac12$，于是

$$
|f_n(x_n)-f(x_n)|=\tfrac12 .
$$

这个误差不随 $n$ 变小，所以 $\sup_x|f_n(x)-f(x)|\ge\tfrac12$，不可能趋于 $0$。

**逐点收敛不足以保住连续性；一致收敛可以。**

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 复习逐点收敛与一致收敛；$x^n$ 的例子 |
| 6:29 | 定理：连续函数的一致极限连续 |
| 9:07 | 用 $\varepsilon/3$ 拆分证明 |
| 16:24 | 例：指数级数在任意有界区间上一致收敛，故连续 |
| 19:02 | 把一致收敛看作 sup 度量下的收敛 |
| 25:36 | 定理：$C([a,b])$ 在 sup 度量下完备 |
| 28:31 | 先用逐点极限构造候选函数 $f$ |
| 35:11 | 再把逐点收敛提升为一致收敛 |
| 40:30 | 定理：积分与一致极限可交换 |
| 46:46 | 用上下和与 $\varepsilon/3(b-a)$ 完成证明 |
| 1:13:28 | 应用到幂级数的逐项积分 |
| 1:18:36 | 预告下节课：求导与一致极限 |

## 定理：一致极限保持连续

**定理。** 设 $f_n$ 在区间 $I$ 上连续，且 $f_n\to f$ 一致。则 $f$ 在 $I$ 上连续。

### 完整证明

任取 $x_0\in I$，证明 $f$ 在 $x_0$ 连续。给定 $\varepsilon>0$。

**第一步：用一致收敛固定一个下标。** 因为 $f_n\to f$ 一致，存在 $N$，使 $n\ge N$ 时对**所有** $x$ 都有

$$
|f_n(x)-f(x)|<\frac{\varepsilon}{3}.
$$

只需取 $n=N$：

$$
|f_N(x)-f(x)|<\frac{\varepsilon}{3}
\quad\text{对一切 }x\in I\text{ 成立}.
$$

这一步允许我们把 $f$ 换成固定的 $f_N$，而且换的代价在所有点上一致地小。

**第二步：用 $f_N$ 的连续性找 $\delta$。** 因为 $f_N$ 在 $x_0$ 连续，存在 $\delta>0$，使

$$
|x-x_0|<\delta
\Rightarrow
|f_N(x)-f_N(x_0)|<\frac{\varepsilon}{3}.
$$

**第三步：三角不等式。** 对满足 $|x-x_0|<\delta$ 的 $x$，插入 $f_N(x)$ 与 $f_N(x_0)$：

$$
\begin{aligned}
|f(x)-f(x_0)|
&\le |f(x)-f_N(x)| \\
&\quad + |f_N(x)-f_N(x_0)| \\
&\quad + |f_N(x_0)-f(x_0)| \\
&< \frac{\varepsilon}{3}+\frac{\varepsilon}{3}+\frac{\varepsilon}{3}
=\varepsilon .
\end{aligned}
$$

所以 $f$ 在 $x_0$ 连续。由于 $x_0$ 任意，$f$ 在 $I$ 上连续。$\square$

三段的来源要分清：第一段和第三段来自**一致收敛**（同一个点、同一个下标 $N$，误差对所有 $x$ 统一），中间一段来自 **$f_N$ 的连续性**（同一个函数、两个邻近的点）。逐点收敛做不到第一段和第三段统一，因为那里的 $N$ 会随 $x$ 变大。

### 立刻可用的推论

设

$$
E_n(x)=\sum_{k=0}^{n}\frac{x^k}{k!},
\qquad
E(x)=\sum_{k=0}^{\infty}\frac{x^k}{k!}.
$$

$E_n$ 是多项式，连续。由 Weierstrass $M$ 判别法（上一讲证明），在任意固定区间 $[-L,L]$ 上，级数被 $\sum L^k/k!<\infty$ 控制，因此 $E_n\to E$ 在 $[-L,L]$ 上一致。由上面的定理，$E$ 在每个 $[-L,L]$ 上连续，从而在 $\mathbb R$ 上连续。

注意「一致」的范围：不是在整个 $\mathbb R$ 上一致，而是在每个有界区间上一致。这类收敛通常叫「内闭一致收敛」。

## 一致收敛就是 sup 度量下的收敛

$C([a,b])$ 表示闭区间上全体连续函数。它带有天然的距离

$$
d(f,g)=\max_{x\in[a,b]}|f(x)-g(x)| .
$$

这个 $\max$ 确实取得到：$f-g$ 连续，取绝对值后仍连续，由最值定理在有界闭区间上达到最大值。

**命题。** $f_n\to f$ 一致，当且仅当 $d(f_n,f)\to 0$。

**证明。** 两个方向都是重写定义。

若 $f_n\to f$ 一致：给定 $\varepsilon>0$，存在 $N$，使 $n\ge N$ 时 $|f_n(x)-f(x)|<\varepsilon$ 对一切 $x$ 成立。对固定 $n$ 取上确界（此时一致收敛已保证误差对所有 $x$ 一致地小），得到 $d(f_n,f)\le\varepsilon$。故 $d(f_n,f)\to0$。

反之，若 $d(f_n,f)\to0$：给定 $\varepsilon>0$，取 $N$ 使 $n\ge N$ 时 $d(f_n,f)<\varepsilon$。由于每个点上的值不超过最大值，

$$
|f_n(x)-f(x)|\le d(f_n,f)<\varepsilon
\quad\text{对一切 }x
$$

同时成立。这正是 $f_n\to f$ 一致。$\square$

这个改写把「函数列的一致收敛」变成了「度量空间中点列的收敛」，于是度量空间的全部工具（Cauchy 列、完备性、压缩映射）都可以直接使用。这不是记号上的方便，而是后面解常微分方程的关键入口。

## $C([a,b])$ 是完备的

**定理。** 度量空间 $\bigl(C([a,b]),d\bigr)$ 是 Cauchy 完备的：每个 Cauchy 列都收敛到该空间中的某个函数。

设 $(f_n)$ 是 Cauchy 列。要证明两件事：先构造候选极限 $f$，再证明它在空间里并且收敛。

### 第一步：逐点构造极限

固定 $x\in[a,b]$。由

$$
|f_n(x)-f_m(x)|
\le \max_{z\in[a,b]}|f_n(z)-f_m(z)|
=d(f_n,f_m),
$$

可知实数列 $(f_n(x))$ 是 Cauchy 列。实数系完备，所以它收敛。定义

$$
f(x)=\lim_{n\to\infty}f_n(x).
$$

每个 $x$ 给出唯一一个实数，因此 $f$ 是一个函数。此时只知道**逐点**收敛，还不知道 $f$ 连续。

### 第二步：把逐点提升为一致

给定 $\varepsilon>0$。因为 $(f_n)$ 在度量意义下是 Cauchy 列，存在 $N$，使 $n,m\ge N$ 时

$$
d(f_n,f_m)\le\frac{\varepsilon}{2}.
$$

于是对每个 $x$，

$$
|f_n(x)-f_m(x)|\le\frac{\varepsilon}{2}.
$$

固定 $n\ge N$，让 $m\to\infty$。左边趋于 $|f_n(x)-f(x)|$，右边是常数，于是

$$
|f_n(x)-f(x)|\le\frac{\varepsilon}{2}
\quad\text{对一切 }x\text{ 成立}.
$$

这一步只能得到「不超过 $\varepsilon/2$」，因为不等式在取极限时会保留 $\le$。现在对所有 $x$ 取上确界：

$$
\sup_{x}|f_n(x)-f(x)|\le\frac{\varepsilon}{2}<\varepsilon .
$$

这里必须用 $\sup$ 而不是 $\max$：此刻还不知道 $f$ 连续，最值定理还不能用，最大值可能取不到。等会儿证明 $f$ 连续之后，$\sup$ 就等于 $\max$。

结论是 $f_n\to f$ 一致，即 $d(f_n,f)\to0$。

### 第三步：极限仍在空间里

$f_n$ 都连续，且 $f_n\to f$ 一致，由本节第一个定理，$f$ 连续。所以 $f\in C([a,b])$。结合第二步，$f_n\to f$ 在度量 $d$ 下成立。$\square$

整个证明的分工值得记住：**完备性只在第一步用到**（实数的完备性），**一致收敛性在第二步建立**，**闭包性（连续性）在第三步补上**。三步各管一件事，缺一不可。

## 定理：积分与一致极限可交换

设 $f_n$ 在 $[a,b]$ 上可积，且 $f_n\to f$ 一致。**定理断言**：

1. $f$ 可积；
2. $\displaystyle\lim_{n\to\infty}\int_a^b f_n=\int_a^b f$，特别地，右边的极限存在。

注意这里只假设 $f_n$ 可积，没有假设连续。极限 $f$ 也可能不连续（如 $x^n$ 的例子），因此不能靠「连续函数可积」蒙混过去。

### 证明思路

Riemann 可积的判据是：对每个 $\varepsilon>0$，存在分割 $P$，使得

$$
U(f,P)-L(f,P)<\varepsilon ,
$$

其中 $U,L$ 分别是上、下和。

思路是：先用一致收敛把 $f$ 的上下和夹在 $f_N$ 的上下和之间，误差是 $\pm\varepsilon/3$；再对 $f_N$ 选一个使上下和接近的分割；两者合成，得到 $f$ 的上下和之差小于 $\varepsilon$。

### 上、下和的逐项估计

设分割 $P$ 的分点为 $x_0<\cdots<x_m$，小区间 $I_i=[x_{i-1},x_i]$，长度 $\Delta x_i$。记

$$
M_i(f)=\sup_{I_i}f,
\qquad
m_i(f)=\inf_{I_i}f .
$$

因为 $f_n\to f$ 一致，取 $n$ 足够大，使

$$
|f_n(x)-f(x)|<\frac{\varepsilon}{3(b-a)}
\quad\text{对一切 }x .
$$

固定这样一个 $n$。对任意 $x$，

$$
f(x)\le f_n(x)+|f(x)-f_n(x)|<f_n(x)+\frac{\varepsilon}{3(b-a)}.
$$

在小区间 $I_i$ 上取上确界：

$$
M_i(f)\le M_i(f_n)+\frac{\varepsilon}{3(b-a)}.
$$

同理，从 $f(x)\ge f_n(x)-|f(x)-f_n(x)|$ 取下确界得

$$
m_i(f)\ge m_i(f_n)-\frac{\varepsilon}{3(b-a)}.
$$

把两条不等式分别乘 $\Delta x_i$ 并对 $i$ 求和。注意 $\sum_i\Delta x_i=b-a$，常数项正好消掉分母：

$$
L(f_n,P)-\frac{\varepsilon}{3}
\le L(f,P)
\le U(f,P)
\le U(f_n,P)+\frac{\varepsilon}{3}.
$$

这一步对**任意**分割 $P$ 都成立，只用到一致收敛。

### 选分割，得到可积性

上面那个 $n$ 固定后，$f_n$ 是可积的。于是存在分割 $P$，使

$$
U(f_n,P)-L(f_n,P)<\frac{\varepsilon}{3}.
$$

对这个 $P$，

$$
\begin{aligned}
U(f,P)-L(f,P)
&\le \Bigl(U(f_n,P)+\frac{\varepsilon}{3}\Bigr)
-\Bigl(L(f_n,P)-\frac{\varepsilon}{3}\Bigr)\\
&=\bigl(U(f_n,P)-L(f_n,P)\bigr)+\frac{2\varepsilon}{3}\\
&<\frac{\varepsilon}{3}+\frac{2\varepsilon}{3}=\varepsilon .
\end{aligned}
$$

由可积判据，$f$ 可积。这就完成了第一件事。

### 积分的收敛

对任何分割 $P$，积分被上下和夹住：

$$
L(f,P)\le\int_a^b f\le U(f,P).
$$

取上面那个使 $U(f_N,P)-L(f_N,P)<\varepsilon/3$ 的 $P$（把 $n$ 取成 $N$）。由上、下和的夹逼，

$$
L(f_N,P)-\frac{\varepsilon}{3}\le\int_a^b f\le U(f_N,P)+\frac{\varepsilon}{3},
$$

同时

$$
L(f_N,P)\le\int_a^b f_N\le U(f_N,P).
$$

所以 $\int_a^b f$ 与 $\int_a^b f_N$ 都落在长度为 $\varepsilon$ 的区间

$$
\Bigl[L(f_N,P)-\frac{\varepsilon}{3},\;U(f_N,P)+\frac{\varepsilon}{3}\Bigr]
$$

内（其长度为 $\bigl(U(f_N,P)-L(f_N,P)\bigr)+\tfrac{2\varepsilon}{3}<\varepsilon$）。于是

$$
\left|\int_a^b f-\int_a^b f_N\right|<\varepsilon .
$$

对任意 $\varepsilon>0$ 找到这样的 $N$，就证明了 $\int f_n\to\int f$。$\square$

课程末尾回应了一个提问：证明中有些地方写 $\le$、有些写 $<$，这无关紧要，因为 $\varepsilon$ 是任取的，把常数取成 $\varepsilon/4$ 之类的更小量即可得到严格不等号。

## 用幂级数算积分

回到 $E_n(x)=\sum_{k=0}^n x^k/k!$，它在 $[a,b]$ 上一致收敛到 $E$。$E_n$ 是多项式，可以逐项积分：

$$
\int_a^b E_n(x)\,dx
=\sum_{k=0}^{n}\int_a^b\frac{x^k}{k!}\,dx .
$$

由积分交换定理，左边趋于 $\int_a^b E$，于是

$$
\int_a^b E(x)\,dx
=\sum_{k=0}^{\infty}\int_a^b\frac{x^k}{k!}\,dx .
$$

每一项可以直接算。找 $x^{k+1}/(k+1)!$ 求导：

$$
\frac{d}{dx}\frac{x^{k+1}}{(k+1)!}
=\frac{(k+1)x^{k}}{(k+1)!}
=\frac{x^k}{k!}.
$$

所以

$$
\int_a^b \frac{x^k}{k!}\,dx
=\frac{b^{k+1}-a^{k+1}}{(k+1)!}.
$$

结论：一致收敛把「对无穷级数积分」合法地变成「对每一项积分再求和」。有限和当然可以随便交换，无限和不行——这里的一致性正是许可证。

## 本节结论

- 连续函数的一致极限连续；逐点极限不一定连续（$x^n$ 是反例）。
- 连续性的证明固定一个 $f_N$，用 $\varepsilon/3$ 三段估计。
- 一致收敛等价于 sup 度量下的收敛；$\sup$ 与 $\max$ 的区别在于极限函数是否已知连续。
- $C([a,b])$ 在 sup 度量下 Cauchy 完备。
- 可积函数的一致极限可积，且积分与极限可交换。
- 幂级数在其收敛区间内可以逐项积分；逐项求导留到下一讲。

## 理解检验

**1. 用 $f_n(x)=x^n$ 说明：为什么逐点收敛不能保证极限连续？请写出使一致收敛失败的那组点。**

参考答案：逐点极限是 $f(0\le x<1)=0$、$f(1)=1$，在 $1$ 处不连续，而每个 $f_n$ 连续，所以逐点收敛不保连续性。取 $x_n=2^{-1/n}\in(0,1)$，则 $f_n(x_n)=1/2$，而 $f(x_n)=0$，故 $|f_n(x_n)-f(x_n)|=1/2$。于是 $\sup_x|f_n(x)-f(x)|\ge1/2$ 对所有 $n$ 成立，不趋于 $0$，一致收敛失败。

**2. 证明「$f_n\to f$ 一致」等价于「$d(f_n,f)\to0$」，并指出证明中哪一步用了「对所有 $x$ 同时成立」。**

参考答案：两个方向都只是把定义换个写法。若一致收敛，给定 $\varepsilon$，存在 $N$ 使 $n\ge N$ 时 $|f_n(x)-f(x)|<\varepsilon$ 对所有 $x$ 同时成立；这个同一个 $\varepsilon$ 上界对所有 $x$ 有效，所以取上确界得 $d(f_n,f)\le\varepsilon$。反过来，若 $d(f_n,f)<\varepsilon$，因为每个点的值不超过最大值，$|f_n(x)-f(x)|\le d(f_n,f)<\varepsilon$ 对所有 $x$ 同时成立。关键就是「同一个 $\varepsilon$ 界对所有 $x$ 有效」；逐点收敛时 $\varepsilon$ 界依赖于 $x$，无法取上确界。

**3. 在完备性证明中，已经得到 $f_n(x)\to f(x)$（逐点），为什么还必须再证一致收敛？**

参考答案：逐点收敛只能说明每个点上的值收敛，还不足以保证 $f$ 连续，也不足以说明 $(f_n)$ 在度量 $d$ 下收敛。完备性要求的是：Cauchy 列在**该度量**下收敛到空间内的点，而 $d$ 度量的是全体点上误差的上确界。只有把逐点收敛提升为 $\sup_x|f_n-f|\to0$，才能得到 $d(f_n,f)\to0$；也只有再用一次「一致极限保连续」，才能确认 $f\in C([a,b])$，即极限没有跑出空间。

**4. 积分定理的证明里，$\varepsilon/(3(b-a))$ 中的 $3$ 和 $(b-a)$ 各起什么作用？**

参考答案：$(b-a)$ 用来抵消求和后出现的区间总长：常数误差在长度为 $b-a$ 的区间上积分，总量是 $\frac{\varepsilon}{3(b-a)}(b-a)=\frac{\varepsilon}{3}$，于是上下和各自偏移 $\varepsilon/3$。$3$ 用来分配总误差：$f$ 与 $f_n$ 的上下和之间共偏移 $2\varepsilon/3$，再留 $\varepsilon/3$ 给 $f_n$ 自身的上下和之差（可积性），合计小于 $\varepsilon$。换成 $\varepsilon/4$ 或别的常数同样可行，只要三部分之和小于 $\varepsilon$。

**5. 定理只假设 $f_n$ 可积，没有假设连续。为什么不能直接说「$f$ 是连续函数的极限所以可积」？**

参考答案：因为一致极限虽然保持连续，但这里的 $f_n$ 未必连续，而且即便 $f_n$ 连续，逐点极限也可能不连续（$x^n$），所以「极限连续」这条路线本身就不总可用。定理的结论是 $f$ 可积，这必须用 Riemann 判据直接证明：对给定 $\varepsilon$ 构造分割 $P$ 使 $U(f,P)-L(f,P)<\varepsilon$。证明中把 $f$ 的上下和夹在 $f_N$ 的上下和之间，正是绕开连续性、只依赖可积性与一致收敛的做法。

## 与前后课的关系

上一讲建立了 Weierstrass $M$ 判别法与逐点/一致收敛的区别；本讲把它们组织成一套工具：连续性的保持、度量观点、完备性、积分交换。下一讲处理剩下的那块——**求导能否与极限交换**。答案需要更强的假设（导数一致收敛），得到之后就能证明幂级数在收敛区间内可以逐项求导任意多次，并导出指数函数满足 $E'=E$。

再往后，$C([a,b])$ 的完备性与 sup 度量会被直接用来证明 Picard–Lindelöf 定理：把微分方程的解写成积分算子的不动点。本讲看似抽象的三步证明，正是那条主线的地基。
