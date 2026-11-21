---
slug: "27-homework-04"
title: "第 4 次作业（极限、连续与一致连续）"
summary: "第 4 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "04"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "第四次.png"
    url: "https://drive.google.com/file/d/1OQ_YAgpEn_HYqqvRigy2i7gSaJwmB7oa/view?usp=drivesdk"
  - kind: article
    title: "第4次作业解答.pdf"
    url: "https://drive.google.com/file/d/1Qww9UTShSaPLOai2DQCGSkqJJ0D1KVgY/view?usp=drivesdk"
---

本次作业覆盖第二章的后半部分：极限计算、渐近线、海涅定理、函数连续与间断、零点定理、一致连续。题目中多数是计算与判断，最后两题是证明。下面按题号整理，先写题目，再写解析；较难的题目补充“思路”，说明为什么选这个方法。

## 1. 求下列极限（需简要写出计算过程）

<!-- homework-topic: 求六个极限：多项式代入、$x\to\pm\infty$ 的有理式、$(-2)^n$ 与 $3^n$ 之商、裂项求和 -->

### (1)

$$
\lim_{x\to-1}(x^2+1)(1-2x)^2.
$$

**解**：这是多项式，连续，直接代入：

$$
\lim_{x\to-1}(x^2+1)(1-2x)^2
=(1+1)(1+2)^2
=2\cdot9
=18.
$$

### (2)

$$
\lim_{x\to+\infty}(x^5-40x^4).
$$

**解**：提出最高次项：

$$
x^5-40x^4=x^5\left(1-\frac{40}{x}\right).
$$

当 $x\to+\infty$ 时，$x^5\to+\infty$，而 $1-\dfrac{40}{x}\to1$，所以

$$
\lim_{x\to+\infty}(x^5-40x^4)=+\infty.
$$

不要因为“$+\\infty-\\infty$”的形式就误以为需要变形；这里最高次项是正的，且次数为奇数，所以整体仍趋于 $+\infty$。

### (3)

$$
\lim_{x\to+\infty}\frac{x^3+1}{x^4+2}.
$$

**解**：分子、分母同除以 $x^4$：

$$
\frac{x^3+1}{x^4+2}
=\frac{x^3}{x^4}\cdot\frac{1+\frac1{x^3}}{1+\frac2{x^4}}
=\frac1x\cdot\frac{1+\frac1{x^3}}{1+\frac2{x^4}}.
$$

当 $x\to+\infty$ 时，$\dfrac1x\to0$，后面分式趋于 $1$，所以极限为 $0$。

一般地，有理函数在 $x\to\infty$ 时，若分母次数高于分子次数，极限为 $0$。

### (4)

$$
\lim_{x\to-\infty}\frac{5x^3+2x}{x^{10}+x+7}.
$$

**解**：分子次数 $3$，分母次数 $10$，分母次数更高。同除以 $x^{10}$：

$$
\frac{5x^3+2x}{x^{10}+x+7}
=\frac{\frac5{x^7}+\frac2{x^9}}{1+\frac1{x^9}+\frac7{x^{10}}}\to\frac{0+0}{1+0+0}=0.
$$

所以极限为 $0$。

### (5)

$$
\lim_{n\to\infty}\frac{(-2)^n+3^n}{(-2)^{n+1}+3^{n+1}}.
$$

**解**：分子、分母同除以 $3^{n+1}$：

$$
\frac{(-2)^n+3^n}{(-2)^{n+1}+3^{n+1}}
=\frac{\frac13\left(-\frac23\right)^n+\frac13}{\left(-\frac23\right)^{n+1}+1}.
$$

因为 $\left|-\dfrac23\right|<1$，所以 $\left(-\dfrac23\right)^n\to0$。于是

$$
\lim_{n\to\infty}\frac{(-2)^n+3^n}{(-2)^{n+1}+3^{n+1}}
=\frac{\frac13}{1}
=\frac13.
$$

这里的关键是“除以增长最快的底数”。$3^n$ 比 $(-2)^n$ 增长快，所以分子分母都除以 $3^{n+1}$，把 $(-2/3)^n$ 这个趋于零的项暴露出来。

### (6)

$$
\lim_{n\to\infty}\left[\frac1{2!}+\frac2{3!}+\cdots+\frac{n}{(n+1)!}\right].
$$

**解**：利用

$$
\frac{k}{(k+1)!}
=\frac{(k+1)-1}{(k+1)!}
=\frac1{k!}-\frac1{(k+1)!}.
$$

于是部分和裂项相消：

$$
\begin{aligned}
\sum_{k=1}^n\frac{k}{(k+1)!}
&=\left(\frac1{1!}-\frac1{2!}\right)
+\left(\frac1{2!}-\frac1{3!}\right)
+\cdots
+\left(\frac1{n!}-\frac1{(n+1)!}\right)\\
&=1-\frac1{(n+1)!}.
\end{aligned}
$$

令 $n\to\infty$，$\dfrac1{(n+1)!}\to0$，所以极限为

$$
1.
$$

---

## 2. 求函数

<!-- homework-topic: 求 $y=\dfrac{2x^2}{(1-x)^2}$ 图像的所有渐近线 -->

$$
y=\frac{2x^2}{(1-x)^2}
$$

图像的所有渐近线。

**思路**：渐近线分两类。竖直渐近线看分母为零、分子不为零的点；水平或斜渐近线看 $x\to\infty$ 时函数与某条直线的差是否趋于零。先找竖直的，再按

$$
k=\lim_{x\to\infty}\frac{y}{x},\qquad
b=\lim_{x\to\infty}(y-kx)
$$

找斜渐近线；若 $k=0$，得到的就是水平渐近线。

**解**：先求竖直渐近线。当 $x\to1$ 时，分母 $(1-x)^2\to0^+$，分子 $2x^2\to2$，所以

$$
\lim_{x\to1}\frac{2x^2}{(1-x)^2}=+\infty.
$$

因此 $x=1$ 是函数图像的竖直渐近线。

再求斜（或水平）渐近线：

$$
k=\lim_{x\to\infty}\frac{1}{x}\cdot\frac{2x^2}{(1-x)^2}
=\lim_{x\to\infty}\frac{2x}{(1-x)^2}=0,
$$

$$
b=\lim_{x\to\infty}\left[\frac{2x^2}{(1-x)^2}-kx\right]
=\lim_{x\to\infty}\frac{2x^2}{(1-x)^2}
=2.
$$

所以函数图像还有水平渐近线

$$
y=2.
$$

由于 $k=0$，没有斜渐近线。函数图像在 $x=1$ 两侧都向上无限延伸，在无穷远处从上方趋近于 $y=2$。

---

## 3. 利用海涅定理证明

<!-- homework-topic: 用海涅定理证明 $\lim\limits_{x\to+\infty}\cos x$ 不存在 -->

$$
\lim_{x\to+\infty}\cos x
$$

不存在。

**思路**：海涅定理说，如果函数极限存在，那么无论用哪一列 $x_k\to+\infty$，函数值都必须趋于同一个极限。因此只要找两列趋于 $+\infty$ 的 $x_k$，使 $\cos x_k$ 趋于两个不同的值，就能否定极限的存在。

**证明**：取两个子列

$$
x_k=2k\pi,\qquad z_k=2k\pi+\frac{\pi}{2},\qquad k\ge1.
$$

当 $k\to\infty$ 时，$x_k\to+\infty$，$z_k\to+\infty$，且

$$
\cos x_k\equiv1,\qquad \cos z_k\equiv0.
$$

两个函数值数列的极限不相等。由海涅定理，

$$
\lim_{x\to+\infty}\cos x
$$

不存在。

---

## 4. 求下列极限（需简要写出计算过程）

<!-- homework-topic: 求四个极限：$1^\infty$ 型与 $\tan x$ 在 $\pi/4$ 处的差商 -->

### (1)

$$
\lim_{x\to0}(1+\alpha x)^{\frac1x}.
$$

**思路**：这是 $1^\infty$ 型。幂指函数先取对数，把指数上的极限变成

$$
\frac{\ln(1+\alpha x)}{x},
$$

再用 $\ln(1+t)\sim t$。

**解**：

$$
\begin{aligned}
\lim_{x\to0}(1+\alpha x)^{\frac1x}
&=\lim_{x\to0}\exp\left[\frac1x\ln(1+\alpha x)\right]\\
&=\exp\left[\lim_{x\to0}\frac{\ln(1+\alpha x)}{x}\right]\\
&=\exp\left[\lim_{x\to0}\frac{\alpha x}{x}\right]\\
&=e^\alpha.
\end{aligned}
$$

### (2)

$$
\lim_{x\to+\infty}\left(1-\frac1x\right)^{4x}.
$$

**解**：把它凑成标准形式：

$$
\left(1-\frac1x\right)^{4x}
=\left[\left(1+\frac1{-x}\right)^{-x}\right]^{-4}.
$$

当 $x\to+\infty$ 时，$-x\to-\infty$，而

$$
\lim_{t\to\infty}\left(1+\frac1t\right)^t=e.
$$

所以

$$
\lim_{x\to+\infty}\left(1-\frac1x\right)^{4x}
=e^{-4}.
$$

### (3)

$$
\lim_{x\to1}x^{\frac1{1-x}}.
$$

**思路**：仍是 $1^\infty$ 型。取对数后，分子 $\ln x$ 在 $x=1$ 附近与 $x-1$ 等价，正好和分母 $1-x$ 约掉。

**解**：

$$
\begin{aligned}
\lim_{x\to1}x^{\frac1{1-x}}
&=\lim_{x\to1}\exp\left[\frac{\ln x}{1-x}\right]\\
&=\exp\left[\lim_{x\to1}\frac{\ln x}{1-x}\right].
\end{aligned}
$$

令 $t=x-1$，则 $t\to0$，$\ln x=\ln(1+t)\sim t$，$1-x=-t$。所以

$$
\lim_{x\to1}\frac{\ln x}{1-x}
=\lim_{t\to0}\frac{t}{-t}
=-1.
$$

因此

$$
\lim_{x\to1}x^{\frac1{1-x}}=e^{-1}.
$$

### (4)

$$
\lim_{x\to\frac{\pi}{4}}\frac{\tan x-1}{x-\frac{\pi}{4}}.
$$

**思路**：这是 $\dfrac00$ 型。把 $\tan x-1$ 化成 $\sin x-\cos x$ 除以 $\cos x$，再把 $\sin x-\cos x$ 凑成 $\sqrt2\sin\left(x-\dfrac{\pi}{4}\right)$，就能约去 $x-\dfrac{\pi}{4}$。

**解**：

$$
\tan x-1=\frac{\sin x-\cos x}{\cos x}
=\frac{\sqrt2\sin\left(x-\frac{\pi}{4}\right)}{\cos x}.
$$

于是

$$
\begin{aligned}
\lim_{x\to\frac{\pi}{4}}\frac{\tan x-1}{x-\frac{\pi}{4}}
&=\lim_{x\to\frac{\pi}{4}}\frac{\sqrt2\sin\left(x-\frac{\pi}{4}\right)}{\left(x-\frac{\pi}{4}\right)\cos x}\\
&=\sqrt2\lim_{x\to\frac{\pi}{4}}\frac{\sin\left(x-\frac{\pi}{4}\right)}{x-\frac{\pi}{4}}\cdot\lim_{x\to\frac{\pi}{4}}\frac1{\cos x}\\
&=\sqrt2\cdot1\cdot\frac1{\frac{\sqrt2}{2}}\\
&=2.
\end{aligned}
$$

---

## 5. 试确定 $A$ 的值，使函数

<!-- homework-topic: 确定 $A$ 使分段函数 $f(x)=(1-x)^{1/x}\ (x\ne0)$ 在 $x=0$ 处连续 -->

$$
f(x)=
\begin{cases}
(1-x)^{\frac1x}, & x\ne0,\\
A, & x=0
\end{cases}
$$

在 $x=0$ 处连续。

**思路**：分段函数在分段点连续，等价于“函数值等于极限值”，即

$$
A=\lim_{x\to0}(1-x)^{\frac1x}.
$$

**解**：为使函数在 $x=0$ 处连续，需要

$$
A=\lim_{x\to0}(1-x)^{\frac1x}.
$$

取对数：

$$
\begin{aligned}
A&=\lim_{x\to0}\exp\left[\frac1x\ln(1-x)\right]\\
&=\exp\left[\lim_{x\to0}\frac{\ln(1-x)}{x}\right].
\end{aligned}
$$

由 $\ln(1+t)\sim t$（$t\to0$），取 $t=-x$，得

$$
\frac{\ln(1-x)}{x}=\frac{-x+o(x)}{x}\to-1.
$$

所以

$$
A=e^{-1}.
$$

因此，当 $A=e^{-1}$ 时，函数在 $x=0$ 处连续。

---

## 6. 判断函数

<!-- homework-topic: 判断 $f(x)=\dfrac{e^{1/x}+1}{e^{1/x}-1}$ 在 $x=0$ 处间断点的类型 -->

$$
f(x)=
\begin{cases}
\dfrac{e^{\frac1x}+1}{e^{\frac1x}-1}, & x\ne0,\\
0, & x=0
\end{cases}
$$

在 $x=0$ 处间断点的类型。

**思路**：$x\to0^+$ 与 $x\to0^-$ 时，$\dfrac1x$ 分别趋于 $+\infty$ 与 $-\infty$，$e^{1/x}$ 的行为完全不同。因此要分别算左右极限。

**解**：计算函数在 $x=0$ 处的左右极限。

右极限：当 $x\to0^+$ 时，$e^{1/x}\to+\infty$。分子分母同除以 $e^{1/x}$：

$$
\lim_{x\to0^+}f(x)
=\lim_{x\to0^+}\frac{1+e^{-\frac1x}}{1-e^{-\frac1x}}
=\frac{1+0}{1-0}=1.
$$

左极限：当 $x\to0^-$ 时，$e^{1/x}\to0$。于是

$$
\lim_{x\to0^-}f(x)
=\frac{0+1}{0-1}
=-1.
$$

左右极限都存在，但不相等，所以 $x=0$ 是函数的**跳跃间断点**，跃度为

$$
1-(-1)=2.
$$

---

## 7. 求函数

<!-- homework-topic: 求 $f(x)=\lim\limits_{n\to\infty}\dfrac{1+x}{1+x^{2n}}$ 的表达式，作图并判断间断点类型 -->

$$
f(x)=\lim_{n\to\infty}\frac{1+x}{1+x^{2n}},\qquad x\in\mathbb R,
$$

画出其图像，并指出 $f(x)$ 的间断点及其类型。

**思路**：$x^{2n}$ 的极限取决于 $|x|$ 与 $1$ 的大小关系。因此按 $|x|<1$、$|x|>1$、$x=\pm1$ 分情形计算。分段点 $x=\pm1$ 要单独看左右极限。

**解**：对 $x$ 分情形计算极限。

- 当 $|x|<1$ 时，$x^{2n}\to0$，所以
  $$
  f(x)=\frac{1+x}{1+0}=1+x.
  $$
- 当 $|x|>1$ 时，$x^{2n}\to+\infty$。分子分母同除以 $x^{2n}$：
  $$
  f(x)=\frac{x^{-2n}+x^{1-2n}}{x^{-2n}+1}\to0.
  $$
- 当 $x=1$ 时，
  $$
  f(1)=\lim_{n\to\infty}\frac{2}{2}=1.
  $$
- 当 $x=-1$ 时，
  $$
  f(-1)=\lim_{n\to\infty}\frac{0}{2}=0.
  $$

合起来，

$$
f(x)=
\begin{cases}
0, & -\infty<x\le-1,\\
1+x, & -1<x<1,\\
1, & x=1,\\
0, & 1<x<+\infty.
\end{cases}
$$

据此可画出函数图像：在 $x<-1$ 与 $x>1$ 上，图像是 $x$ 轴；在 $-1<x<1$ 上，图像是直线 $y=1+x$；在 $x=-1$ 处有实心点 $(-1,0)$，在 $x=1$ 处有实心点 $(1,1)$。

![分段函数的图像：x<-1 与 x>1 时 y=0，-1<x<1 时 y=1+x，x=1 处单独取 1](/images/campus-mathematical-analysis/homework04-p09-piecewise.png)

*图 1：$f(x)$ 的图像。$x=-1$ 处左右极限都为 $0$，与函数值一致，故连续；$x=1$ 处左极限为 $2$、右极限为 $0$，发生跳跃。*

由图像可看出：

- 在 $x=-1$ 处，左极限为 $0$，右极限为 $0$，且 $f(-1)=0$，所以连续；
- 在 $x=1$ 处，左极限为
  $$
  \lim_{x\to1^-}(1+x)=2,
  $$
  右极限为
  $$
  \lim_{x\to1^+}0=0,
  $$
  左右极限存在但不相等，所以 $x=1$ 是**跳跃间断点**。

---

## 8. 求下列极限（需简要写出计算过程）

<!-- homework-topic: 求四个极限：根式差的有理化、$1^\infty$ 型、$\arctan$ 的幂与直接代入 -->

### (1)

$$
\lim_{x\to a+}\frac{\sqrt x-\sqrt a}{\sqrt{x^2-a^2}}\qquad(a>0).
$$

**思路**：这是 $\dfrac00$ 型，但分子、分母都含根号。先对分子有理化，把 $x-a$ 约掉，再看剩下的 $\sqrt{x-a}$ 的走向。

**解**：分子有理化：

$$
\sqrt x-\sqrt a=\frac{x-a}{\sqrt x+\sqrt a}.
$$

又

$$
\sqrt{x^2-a^2}=\sqrt{(x-a)(x+a)}.
$$

于是

$$
\begin{aligned}
\frac{\sqrt x-\sqrt a}{\sqrt{x^2-a^2}}
&=\frac{x-a}{(\sqrt x+\sqrt a)\sqrt{(x-a)(x+a)}}\\
&=\frac{\sqrt{x-a}}{(\sqrt x+\sqrt a)\sqrt{x+a}}.
\end{aligned}
$$

当 $x\to a+$ 时，$\sqrt{x-a}\to0$，而分母趋于

$$
(\sqrt a+\sqrt a)\sqrt{2a}=2\sqrt a\sqrt{2a}>0.
$$

所以极限为

$$
\frac0{2\sqrt a\sqrt{2a}}=0.
$$

### (2)

$$
\lim_{x\to\frac{\pi}{2}}\left(2\cos^2\frac x2\right)^{3\sec x}.
$$

**思路**：底数 $2\cos^2\dfrac x2=1+\cos x$ 趋于 $1$，指数 $3\sec x$ 趋于无穷，是 $1^\infty$ 型。取对数后，用 $\ln(1+\cos x)\sim\cos x$。

**解**：令

$$
y=\left(2\cos^2\frac x2\right)^{3\sec x}.
$$

取对数：

$$
\ln y=3\sec x\ln\left(2\cos^2\frac x2\right)
=3\sec x\ln(1+\cos x).
$$

当 $x\to\dfrac{\pi}{2}$ 时，$\cos x\to0$，$\ln(1+\cos x)\sim\cos x$，所以

$$
3\sec x\ln(1+\cos x)
=3\frac{\ln(1+\cos x)}{\cos x}
\to3.
$$

因此

$$
\lim_{x\to\frac{\pi}{2}}y=e^3.
$$

### (3)

$$
\lim_{x\to+\infty}(\arctan x)^{\cos\frac1x}.
$$

**解**：这不是未定型，可以直接用初等函数的连续性计算。当 $x\to+\infty$ 时，

$$
\arctan x\to\frac{\pi}{2},\qquad \cos\frac1x\to\cos0=1.
$$

底数 $\dfrac{\pi}{2}>0$，幂函数在底数正、指数有限处连续，所以

$$
\lim_{x\to+\infty}(\arctan x)^{\cos\frac1x}
=\left(\frac{\pi}{2}\right)^1
=\frac{\pi}{2}.
$$

### (4)

$$
\lim_{x\to0}\left[\frac{\ln\left(\cos^2x+\sqrt{1-x^2}\right)}{e^x+\sin x}+(1+x)^x\right].
$$

**解**：各项在 $x=0$ 处都连续，直接代入：

$$
\cos^2 0+\sqrt{1-0}=1+1=2,
$$

$$
e^0+\sin0=1,
$$

$$
(1+0)^0=1.
$$

所以

$$
\lim_{x\to0}\left[\frac{\ln\left(\cos^2x+\sqrt{1-x^2}\right)}{e^x+\sin x}+(1+x)^x\right]
=\frac{\ln2}{1}+1
=\ln2+1.
$$

---

## 9. 证明：$f(x)=x^3+x+1$ 在 $(-\infty,+\infty)$ 上有唯一零点，且这个零点位于区间 $\left(-1,-\dfrac12\right)$

<!-- homework-topic: 证明 $f(x)=x^3+x+1$ 有唯一零点且该零点位于 $\left(-1,-\dfrac12\right)$ -->

**思路**：分两步。

1. **存在性**：用零点定理。需要找一个区间，使两端函数值异号。
2. **唯一性**：用严格单调性。$x^3$ 与 $x$ 都在 $\mathbb R$ 上严格单调增加，所以 $f$ 严格单调增加；严格单调函数最多有一个零点。

**证明**：首先证明 $f$ 在 $(-\infty,+\infty)$ 上严格单调增加。设 $x_1<x_2$，则

$$
x_2^3-x_1^3=(x_2-x_1)(x_2^2+x_1x_2+x_1^2).
$$

其中 $x_2-x_1>0$，而

$$
x_2^2+x_1x_2+x_1^2
=\left(x_2+\frac{x_1}{2}\right)^2+\frac34x_1^2\ge0,
$$

且只有当 $x_1=x_2=0$ 时才为零。由于 $x_1<x_2$，不能同时有 $x_1=x_2=0$，所以上式严格大于 $0$。因此

$$
x_2^3-x_1^3>0.
$$

又 $x_2-x_1>0$，故

$$
f(x_2)-f(x_1)=(x_2^3-x_1^3)+(x_2-x_1)>0.
$$

所以 $f$ 严格单调增加。

其次，计算

$$
f(-1)=-1-1+1=-1<0,
$$

$$
f\left(-\frac12\right)
=-\frac18-\frac12+1
=\frac38>0.
$$

根据连续函数零点定理，存在

$$
\xi\in\left(-1,-\frac12\right),
$$

使得

$$
f(\xi)=0.
$$

结合 $f$ 的严格单调性，这样的零点只能有一个。因此 $f(x)=x^3+x+1$ 在 $(-\infty,+\infty)$ 上有唯一零点，且该零点位于 $\left(-1,-\dfrac12\right)$。

---

## 10. 函数 $f(x)$ 在有限开区间 $(a,b)$ 连续，证明：

<!-- homework-topic: 证明 $f$ 在 $(a,b)$ 上一致连续当且仅当 $f(a+)$ 与 $f(b-)$ 都存在 -->

$$
f(x)\text{ 在 }(a,b)\text{ 上一致连续}
$$

当且仅当 $f(a+)$ 与 $f(b-)$ 存在。

**思路**：这是“有限开区间上一致连续”的端点判定。

- **充分性**：把端点极限补成函数值，得到闭区间上的连续函数，再用 Cantor 定理。
- **必要性**：一致连续把“$x$ 靠近”转化为“函数值靠近”，于是任何趋近于端点的基本数列，其函数值数列也是基本数列，必定收敛；再用海涅定理得到单侧极限存在。

**证明（充分性）**：设

$$
f(a+)=A,\qquad f(b-)=B.
$$

定义函数

$$
\tilde f(x)=
\begin{cases}
A, & x=a,\\
f(x), & a<x<b,\\
B, & x=b.
\end{cases}
$$

由 $f(a+)=A$、$f(b-)=B$，$\tilde f(x)$ 是闭区间 $[a,b]$ 上的连续函数：在 $(a,b)$ 内与 $f$ 相同，在 $a$ 处右连续，在 $b$ 处左连续。

由 Cantor 定理，$\tilde f(x)$ 在 $[a,b]$ 上一致连续。于是它的限制 $f(x)$ 在开区间 $(a,b)$ 上也是一致连续的。

**证明（必要性）**：设函数 $f(x)$ 在开区间 $(a,b)$ 上一致连续，则

$$
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x',x''\in(a,b),\ |x'-x''|<\delta:\ |f(x')-f(x'')|<\varepsilon.
$$

用海涅定理，在区间 $(a,b)$ 上任意选取数列 $\{x_n\}$，$x_n\in(a,b)$，且

$$
\lim_{n\to\infty}x_n=a.
$$

因数列 $\{x_n\}$ 是基本数列，对于上述 $\delta>0$，存在 $N$，当 $n,m>N$ 时，

$$
|x_n-x_m|<\delta,
$$

从而

$$
|f(x_n)-f(x_m)|<\varepsilon.
$$

这说明函数值数列 $\{f(x_n)\}$ 也是基本数列，因而必定收敛。

> **补充证明**（必要性中略去的一步：极限值与所选数列无关）
>
> 上面只对一个取定的数列 $x_n\to a$ 证明了 $\{f(x_n)\}$ 收敛，这还不足以说明 $f(a+)$ 存在，因为不同的数列可能给出不同的极限。设有两列 $x_n\to a$、$y_n\to a$，取值都在 $(a,b)$ 内，把它们交错排列：
>
> $$
> z_{2k-1}=x_k,\qquad z_{2k}=y_k\qquad(k=1,2,\cdots),
> $$
>
> 则 $z_n\to a$，且 $z_n\in(a,b)$。前面已证的结论（对任何趋于 $a$ 的这种数列，函数值数列都是基本列，因而收敛）适用于 $\{z_n\}$，所以 $\{f(z_n)\}$ 收敛。而 $\{f(x_n)\}$ 与 $\{f(y_n)\}$ 都是 $\{f(z_n)\}$ 的子列，收敛数列的子列与母列有相同的极限，故二者的极限相等。
>
> 于是每个从右侧趋近 $a$ 的数列都给出同一个极限 $L$。由海涅定理即得
>
> $$
> \lim_{x\to a+}f(x)=L
> $$
>
> 存在且有限。$b$ 端完全同理。

---

## 课堂小结

- 有理函数在 $x\to\infty$ 时的极限，先比较分子、分母的次数；次数相同看系数比，分母次数高则极限为 $0$，分子次数高则趋于无穷。
- 含 $(-2)^n$、$3^n$ 的数列极限，除以增长最快的底数，把其余项变成趋于零的项。
- 渐近线先找竖直的（分母零点），再按 $k=\lim y/x$、$b=\lim(y-kx)$ 找斜/水平渐近线；$k=0$ 时为水平渐近线。
- 海涅定理证明极限不存在，找两列趋于同一点（或同一边）但函数值极限不同的数列。
- $1^\infty$ 型统一先取对数，再用 $\ln(1+t)\sim t$；注意最后要取指数还原。
- 分段函数在分段点连续，就是“左极限 $=$ 右极限 $=$ 函数值”；判断间断点类型只看左右极限。
- 含 $x^{2n}$ 的极限，按 $|x|<1$、$|x|>1$、$x=\pm1$ 分情形；分段点要单独算左右极限。
- 根式差用有理化，根式和用平方差公式；不要一上来就等价替换加减法中的项。
- 证明“唯一零点”：零点定理给存在性，严格单调性给唯一性，两者缺一不可。
- 有限开区间上一致连续 $\iff$ 两个端点单侧极限都存在；证明充分性用“延拓 + Cantor”，必要性用“基本数列 + 海涅定理”。
