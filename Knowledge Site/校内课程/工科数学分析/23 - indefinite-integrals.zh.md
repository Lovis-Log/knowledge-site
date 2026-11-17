---
slug: "23-indefinite-integrals"
title: "不定积分"
summary: "第 23 讲：不定积分。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "23"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "23不定积分.pdf"
    url: "https://drive.google.com/file/d/1xTwHcfuqj4DQCpiTyIJbolHUGGRI--ma/view?usp=drivesdk"
---

## 从求导的逆运算说起

已知物体运动的距离 $S=S(t)$，求速度只需求导：$v(t)=S'(t)$。反过来，若已知速度 $v=v(t)$，怎么求距离 $S(t)$？人口模型也是同样的问题：

$$
p'(t)=\lambda p(t),\qquad p(t_0)=p_0,
$$
已知人口增长率，要求人口函数 $p(t)$。几何上则是：已知曲线在每一点的切线斜率，能否确定这条曲线？

> **关键结论**：这些问题的数学形式都一样：**已知一个函数的导数，反求这个函数**。这就是不定积分要解决的问题，它是求导的逆运算。

## 原函数与不定积分

**定义 1** 若在某个区间上，函数 $F(x)$ 与 $f(x)$ 满足

$$
F'(x)=f(x),
$$
或等价地

$$
\mathrm{d}F(x)=f(x)\,\mathrm{d}x,
$$
则称 $F(x)$ 是 $f(x)$ 在该区间上的一个**原函数**。

原函数不唯一。若 $F'(x)=f(x)$，则对任意常数 $C$，

$$
[F(x)+C]'=f(x),
$$
所以 $F(x)+C$ 也是原函数，$f$ 的原函数有无穷多个。

反过来，$f$ 的所有原函数都恰好是 $F(x)+C$ 的形式。设 $G$ 是任一原函数，则 $G'=f=F'$，于是

$$
[F(x)-G(x)]'=0.
$$
由微分中值定理，导数恒为零的函数在区间上为常数，故 $F-G\equiv C$，即 $G=F-C$。因此只要求出**一个**原函数，再补上任意常数，就得到了全部原函数。

**定义 2** 函数 $f(x)$ 的原函数全体称为 $f(x)$ 的**不定积分**，记作

$$
\int f(x)\,\mathrm{d}x.
$$
其中 $\int$ 是积分号，$f(x)$ 是被积函数，$x$ 是积分变量。

积分变量用什么字母无关紧要：

$$
\int f(x)\,\mathrm{d}x=F(x)+C,\quad
\int f(u)\,\mathrm{d}u=F(u)+C,\quad
\int f(t)\,\mathrm{d}t=F(t)+C
$$
表示的是同一族函数。微分与不定积分是一对逆运算：

$$
\int \mathrm{d}F(x)=\int F'(x)\,\mathrm{d}x=F(x)+C,\qquad
\mathrm{d}\left(\int f(x)\,\mathrm{d}x\right)=f(x)\,\mathrm{d}x.
$$

### 三个基本例子

**例 1** 求 $\displaystyle\int \sin x\,\mathrm{d}x$。

因为 $\mathrm{d}(\cos x)=-\sin x\,\mathrm{d}x$，即 $\mathrm{d}(-\cos x)=\sin x\,\mathrm{d}x$，所以

$$
\int \sin x\,\mathrm{d}x=-\cos x+C.
$$

**例 2** 求 $\displaystyle\int x^\alpha\,\mathrm{d}x$（$\alpha\neq-1$）。

因为

$$
\left(\frac{x^{\alpha+1}}{\alpha+1}\right)'=x^\alpha,
$$
所以

$$
\int x^\alpha\,\mathrm{d}x=\frac{x^{\alpha+1}}{\alpha+1}+C,\qquad \alpha\neq-1.
$$

**例 3** 求 $\displaystyle\int\frac{\mathrm{d}x}{x}$。

$x>0$ 时 $(\ln x)'=\dfrac1x$，故

$$
\int\frac{\mathrm{d}x}{x}=\ln x+C\qquad (x>0).
$$
$x<0$ 时，

$$
[\ln(-x)]'=\frac{1}{-x}\cdot(-1)=\frac1x,
$$
故

$$
\int\frac{\mathrm{d}x}{x}=\ln(-x)+C\qquad (x<0).
$$
两式合起来写成

$$
\int\frac{\mathrm{d}x}{x}=\ln|x|+C.
$$

> **易错点**：这里要留意定义区间：$\dfrac1x$ 在 $x=0$ 无定义，原函数只能分别存在于 $(-\infty,0)$ 与 $(0,+\infty)$ 上，两个区间上的常数可以不同。写成 $\ln|x|+C$ 时，默认是在其中一个区间上讨论。

## 基本积分表

这些公式由基本初等函数的导数直接反读得到，应当熟记：


$$
\begin{aligned}
&\int \mathrm{d}x=x+C, &&\int k\,\mathrm{d}x=kx+C,\\
&\int x^\alpha\,\mathrm{d}x=\frac{x^{\alpha+1}}{\alpha+1}+C\ (\alpha\neq-1),
&&\int\frac{\mathrm{d}x}{x}=\ln|x|+C,\\
&\int \sin x\,\mathrm{d}x=-\cos x+C, &&\int \cos x\,\mathrm{d}x=\sin x+C,\\
&\int \sec^2x\,\mathrm{d}x=\tan x+C, &&\int \csc^2x\,\mathrm{d}x=-\cot x+C,\\
&\int \sec x\tan x\,\mathrm{d}x=\sec x+C,
&&\int\frac{\mathrm{d}x}{1+x^2}=\arctan x+C,\\
&\int\frac{\mathrm{d}x}{\sqrt{1-x^2}}=\arcsin x+C,
&&\int \mathrm{e}^x\,\mathrm{d}x=\mathrm{e}^x+C,\\
&\int a^x\,\mathrm{d}x=\frac{a^x}{\ln a}+C\ (a>0,\ a\neq1),
&&\int \operatorname{sh}x\,\mathrm{d}x=\operatorname{ch}x+C,\\
&\int \operatorname{ch}x\,\mathrm{d}x=\operatorname{sh}x+C,
&&\int\frac{\mathrm{d}x}{\operatorname{sh}^2x}=-\coth x+C,\\
&\int\frac{\mathrm{d}x}{\operatorname{ch}^2x}=\operatorname{th}x+C.
\end{aligned}

$$

使用时要带着定义域：$\arcsin x$ 的公式只在 $|x|<1$ 内成立，$\arctan x$ 对一切实数成立，双曲函数的公式也在各自有定义的区间上成立。

## 线性性质

**定理** 若 $f(x)$、$g(x)$ 的原函数都存在，则对任意常数 $k_1,k_2$，$k_1f(x)+k_2g(x)$ 的原函数也存在，且

$$
\int\bigl[k_1f(x)+k_2g(x)\bigr]\,\mathrm{d}x
=k_1\int f(x)\,\mathrm{d}x+k_2\int g(x)\,\mathrm{d}x.
$$

**证明** 设 $F'=f$，$G'=g$，则

$$
\bigl[k_1F(x)+k_2G(x)\bigr]'=k_1F'(x)+k_2G'(x)=k_1f(x)+k_2g(x).
$$
所以 $k_1F+k_2G$ 是 $k_1f+k_2g$ 的一个原函数，两边作为函数族相等。

这个等式应理解为两端表示的函数族相同，右端的任意常数已经吸收了两边常数的差异。当 $k_1=k_2=0$ 时，右端应理解为任意常数 $C$。

## 直接计算举例

**例 4** 求 $\displaystyle\int\tan^2x\,\mathrm{d}x$。

利用 $\tan^2x=\sec^2x-1$：

$$
\int\tan^2x\,\mathrm{d}x=\int(\sec^2x-1)\,\mathrm{d}x=\tan x-x+C.
$$

**例 5** 求 $\displaystyle\int\sin^2\frac{x}{2}\,\mathrm{d}x$。

利用半角公式 $\sin^2\dfrac{x}{2}=\dfrac{1-\cos x}{2}$：

$$
\int\sin^2\frac{x}{2}\,\mathrm{d}x
=\frac12\int(1-\cos x)\,\mathrm{d}x
=\frac{x}{2}-\frac{\sin x}{2}+C.
$$

**例 6** 求 $\displaystyle\int\frac{(\sqrt x+x)(x-2\sqrt x)^2}{\sqrt x}\,\mathrm{d}x$。

先展开分子。由 $(x-2\sqrt x)^2=x^2-4x^{3/2}+4x$，

$$
(\sqrt x+x)(x^2-4x^{3/2}+4x)
=x^3-3x^{5/2}+4x^{3/2}.
$$
除以 $\sqrt x=x^{1/2}$，被积函数化为

$$
x^{5/2}-3x^2+4x.
$$
逐项积分：

$$
\int\left(x^{5/2}-3x^2+4x\right)\mathrm{d}x
=\frac27x^{7/2}-x^3+2x^2+C.
$$

**例 7** 求 $\displaystyle\int\frac{x^4}{1+x^2}\,\mathrm{d}x$。

先做多项式除法：

$$
\frac{x^4}{1+x^2}=\frac{x^4+x^2-x^2}{1+x^2}=x^2-\frac{x^2}{1+x^2}
=x^2-1+\frac{1}{1+x^2}.
$$
于是

$$
\int\frac{x^4}{1+x^2}\,\mathrm{d}x
=\frac{x^3}{3}-x+\arctan x+C.
$$

**例 8** 已知曲线 $y=f(x)$ 在任意一点 $(x,f(x))$ 处的切线斜率都等于 $x^2$，且曲线经过点 $(3,2)$，求曲线方程。

由题意 $y'=x^2$，所以

$$
y=\int x^2\,\mathrm{d}x=\frac{x^3}{3}+C.
$$
这是一族沿 $y$ 轴平移的曲线。代入 $x=3$、$y=2$：

$$
2=\frac{27}{3}+C=9+C\ \Longrightarrow\ C=-7.
$$
所求曲线为

$$
y=\frac{x^3}{3}-7.
$$

## 第一类换元法（凑微分）

设 $f(x)=g(\varphi(x))\varphi'(x)$，则

$$
\int f(x)\,\mathrm{d}x=\int g(\varphi(x))\,\mathrm{d}\varphi(x)
=\int g(u)\,\mathrm{d}u=G(u)+C=G(\varphi(x))+C.
$$
实际操作分三步：把 $f(x)\,\mathrm{d}x$ 凑成 $g(\varphi(x))\,\mathrm{d}\varphi(x)$；对 $u=\varphi(x)$ 积分；再把 $u$ 换回 $\varphi(x)$。这就是“凑”微分法，也叫第一类换元积分法。

> **理解关键**：关键在于观察哪一部分是某个函数的导数。凑得对不对，求导验证一下就知道。

**例 1** 求

$$
\text{(1)}\ \int\frac{\mathrm{d}x}{x-a};\qquad
\text{(2)}\ \int\frac{\mathrm{d}x}{(x-a)^n}\ (n>1);\qquad
\text{(3)}\ \int\frac{\mathrm{d}x}{x^2-a^2}.
$$

(1) 因为 $\mathrm{d}(x-a)=\mathrm{d}x$，

$$
\int\frac{\mathrm{d}x}{x-a}=\int\frac{\mathrm{d}(x-a)}{x-a}=\ln|x-a|+C.
$$

(2) 令 $u=x-a$，

$$
\int\frac{\mathrm{d}x}{(x-a)^n}=\int u^{-n}\,\mathrm{d}u
=\frac{u^{-n+1}}{-n+1}+C
=-\frac{1}{(n-1)(x-a)^{n-1}}+C.
$$

(3) 拆成部分分式：

$$
\frac{1}{x^2-a^2}=\frac{1}{2a}\left(\frac{1}{x-a}-\frac{1}{x+a}\right),
$$
所以

$$
\int\frac{\mathrm{d}x}{x^2-a^2}
=\frac{1}{2a}\left(\ln|x-a|-\ln|x+a|\right)+C
=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C.
$$

**例 2** 求

$$
\int\frac{\mathrm{d}x}{x^2+a^2},\qquad
\int\frac{\mathrm{d}x}{\sqrt{a^2-x^2}}\qquad(a>0).
$$

第一式提出 $a^2$，再令 $u=\dfrac{x}{a}$：

$$
\int\frac{\mathrm{d}x}{x^2+a^2}
=\frac1{a^2}\int\frac{\mathrm{d}x}{1+\left(\frac{x}{a}\right)^2}
=\frac1a\int\frac{\mathrm{d}u}{1+u^2}
=\frac1a\arctan\frac{x}{a}+C.
$$
第二式同样令 $u=\dfrac{x}{a}$，则 $\mathrm{d}x=a\,\mathrm{d}u$，$\sqrt{a^2-x^2}=a\sqrt{1-u^2}$：

$$
\int\frac{\mathrm{d}x}{\sqrt{a^2-x^2}}
=\int\frac{\mathrm{d}u}{\sqrt{1-u^2}}
=\arcsin\frac{x}{a}+C.
$$

**例 3** 求 $\displaystyle\int\tan x\,\mathrm{d}x$ 与 $\displaystyle\int\cot x\,\mathrm{d}x$。


$$
\int\tan x\,\mathrm{d}x=\int\frac{\sin x}{\cos x}\,\mathrm{d}x
=-\int\frac{\mathrm{d}(\cos x)}{\cos x}
=-\ln|\cos x|+C.
$$

$$
\int\cot x\,\mathrm{d}x=\int\frac{\cos x}{\sin x}\,\mathrm{d}x
=\int\frac{\mathrm{d}(\sin x)}{\sin x}
=\ln|\sin x|+C.
$$

**例 4** 求 $\displaystyle\int\sec x\,\mathrm{d}x$。

先把分子分母同乘 $\cos x$：

$$
\int\sec x\,\mathrm{d}x=\int\frac{\cos x}{\cos^2x}\,\mathrm{d}x
=\int\frac{\mathrm{d}(\sin x)}{1-\sin^2x}.
$$
令 $u=\sin x$，利用例 1(3)（取 $a=1$）：

$$
\int\frac{\mathrm{d}u}{1-u^2}=\frac12\ln\left|\frac{1+u}{1-u}\right|+C.
$$
代回并化简：

$$
\begin{aligned}
\int\sec x\,\mathrm{d}x
&=\frac12\ln\left|\frac{1+\sin x}{1-\sin x}\right|+C
=\frac12\ln\left|\frac{(1+\sin x)^2}{\cos^2x}\right|+C\\
&=\ln\left|\frac{1+\sin x}{\cos x}\right|+C
=\ln|\sec x+\tan x|+C.
\end{aligned}

$$
在 $\cos x\neq0$ 的每个区间上，$\dfrac{1+\sin x}{\cos x}$ 符号固定，但不同区间上可以取负值，所以写成 $\ln|\sec x+\tan x|$ 最稳妥；只有在符号为正的区间上才能去掉绝对值。

类似地，

$$
\int\csc x\,\mathrm{d}x=\ln|\csc x-\cot x|+C.
$$
至此六个基本三角函数的不定积分都齐了。

**例 5** 求 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt x\,(1+x)}$。

把 $\dfrac{\mathrm{d}x}{\sqrt x}$ 看成 $2\,\mathrm{d}(\sqrt x)$：

$$
\int\frac{\mathrm{d}x}{\sqrt x\,(1+x)}
=2\int\frac{\mathrm{d}(\sqrt x)}{1+(\sqrt x)^2}
=2\arctan\sqrt x+C.
$$

**例 6** 求 $\displaystyle\int\sin mx\cos nx\,\mathrm{d}x$（$m\neq n$）。

用积化和差：

$$
\sin mx\cos nx=\frac12\left[\sin(m+n)x+\sin(m-n)x\right].
$$
于是

$$
\int\sin mx\cos nx\,\mathrm{d}x
=-\frac12\left[\frac{\cos(m+n)x}{m+n}+\frac{\cos(m-n)x}{m-n}\right]+C.
$$
条件 $m\neq n$ 保证第二个分母不为零。$\sin mx\sin nx$ 与 $\cos mx\cos nx$ 可同样处理。

## 第二类换元法

若 $\displaystyle\int f(x)\,\mathrm{d}x$ 不容易直接求，但存在代换 $x=\varphi(t)$（$\varphi$ 有反函数 $t=\varphi^{-1}(x)$），使

$$
\int f(\varphi(t))\varphi'(t)\,\mathrm{d}t
$$
容易积出，则

$$
\int f(x)\,\mathrm{d}x=\int f(\varphi(t))\varphi'(t)\,\mathrm{d}t
=F(t)+C=F(\varphi^{-1}(x))+C.
$$

> **易混点**：方向与第一类换元相反：第一类是把 $x$ 的式子凑成 $u$，第二类是把 $x$ 本身换成 $t$。根式积分常用第二类，因为换元的目的就是**去掉根号**。

**例 5（再访）** 求 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt x\,(1+x)}$。

令 $\sqrt x=t$，即 $x=t^2$，$\mathrm{d}x=2t\,\mathrm{d}t$：

$$
\int\frac{\mathrm{d}x}{\sqrt x\,(1+x)}
=\int\frac{2t\,\mathrm{d}t}{t(1+t^2)}
=2\int\frac{\mathrm{d}t}{1+t^2}
=2\arctan t+C=2\arctan\sqrt x+C.
$$
与凑微分的结果一致，但书写上多了换元与回代两步。换元简单时，“凑”的形式更方便。

**例 7** 求 $\displaystyle\int\sqrt{a^2-x^2}\,\mathrm{d}x$（$a>0$）。

为了去掉根号，令

$$
x=a\sin t,\qquad -\frac{\pi}{2}\leqslant t\leqslant\frac{\pi}{2},\qquad t=\arcsin\frac{x}{a}.
$$
则 $\sqrt{a^2-x^2}=a\cos t$（在此 $t$ 范围内 $\cos t\geqslant0$），$\mathrm{d}x=a\cos t\,\mathrm{d}t$，于是

$$
\begin{aligned}
\int\sqrt{a^2-x^2}\,\mathrm{d}x
&=a^2\int\cos^2t\,\mathrm{d}t
=\frac{a^2}{2}\int(1+\cos2t)\,\mathrm{d}t\\
&=\frac{a^2}{2}\left(t+\frac{\sin2t}{2}\right)+C
=\frac{a^2}{2}(t+\sin t\cos t)+C.
\end{aligned}

$$
回代 $\sin t=\dfrac{x}{a}$，$\cos t=\dfrac{\sqrt{a^2-x^2}}{a}$：

$$
\int\sqrt{a^2-x^2}\,\mathrm{d}x
=\frac12x\sqrt{a^2-x^2}+\frac{a^2}{2}\arcsin\frac{x}{a}+C.
$$

**例 8** 求 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt{x^2-a^2}}$ 与 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt{x^2+a^2}}$。

第一式令 $x=a\sec t$。先讨论 $x>a$ 的分支，取 $t\in\left(0,\dfrac{\pi}{2}\right)$，此时 $\tan t>0$，

$$
\sqrt{x^2-a^2}=a\tan t,\qquad \mathrm{d}x=a\tan t\sec t\,\mathrm{d}t,
$$
于是

$$
\int\frac{\mathrm{d}x}{\sqrt{x^2-a^2}}=\int\sec t\,\mathrm{d}t
=\ln|\sec t+\tan t|+C.
$$
回代 $\sec t=\dfrac{x}{a}$，$\tan t=\dfrac{\sqrt{x^2-a^2}}{a}$：

$$
\begin{aligned}
\int\frac{\mathrm{d}x}{\sqrt{x^2-a^2}}
&=\ln\left|\frac{x}{a}+\frac{\sqrt{x^2-a^2}}{a}\right|+C\\
&=\ln\left|x+\sqrt{x^2-a^2}\right|+C.
\end{aligned}

$$
最后一步把 $-\ln a$ 吸进了常数。这个公式在 $x<-a$ 上也成立，但**绝对值不能丢**：当 $x<-a$ 时 $x+\sqrt{x^2-a^2}<0$，不取绝对值就不能写对数。

第二式令 $x=a\tan t$，则 $\sqrt{x^2+a^2}=a\sec t$，$\mathrm{d}x=a\sec^2t\,\mathrm{d}t$，

$$
\int\frac{\mathrm{d}x}{\sqrt{x^2+a^2}}=\int\sec t\,\mathrm{d}t
=\ln\left|x+\sqrt{x^2+a^2}\right|+C.
$$
这里 $x+\sqrt{x^2+a^2}>0$ 恒成立，绝对值可省略。

**例 9** 求 $\displaystyle\int x(2x-1)^{100}\,\mathrm{d}x$。

令 $2x-1=t$，则 $x=\dfrac{t+1}{2}$，$\mathrm{d}x=\dfrac12\mathrm{d}t$：

$$
\begin{aligned}
\int x(2x-1)^{100}\,\mathrm{d}x
&=\frac14\int(t+1)t^{100}\,\mathrm{d}t
=\frac14\left(\frac{t^{102}}{102}+\frac{t^{101}}{101}\right)+C\\
&=\frac{(2x-1)^{101}}{4}\left(\frac{2x-1}{102}+\frac{1}{101}\right)+C.
\end{aligned}

$$

**例 10** 求 $\displaystyle\int\frac{\mathrm{d}x}{x^2\sqrt{1+x^2}}$。

**解法一（凑微分）** 当 $x>0$ 时，把被积函数写成

$$
\frac{1}{x^2\sqrt{1+x^2}}
=\frac{1}{x^3}\cdot\frac{1}{\sqrt{1+\frac{1}{x^2}}},
$$
并利用 $\mathrm{d}\left(\dfrac1{x^2}\right)=-\dfrac{2}{x^3}\,\mathrm{d}x$：

$$
\begin{aligned}
\int\frac{\mathrm{d}x}{x^2\sqrt{1+x^2}}
&=-\frac12\int\frac{\mathrm{d}\left(\frac{1}{x^2}\right)}{\sqrt{1+\frac{1}{x^2}}}
=-\sqrt{1+\frac{1}{x^2}}+C\\
&=-\frac{\sqrt{1+x^2}}{x}+C.
\end{aligned}

$$
求导可以验证，这个结果在 $x<0$ 时同样成立。

**解法二（倒代换）** 令 $x=\dfrac1t$，$\mathrm{d}x=-\dfrac{\mathrm{d}t}{t^2}$。当 $x>0$ 时 $t>0$，

$$
\begin{aligned}
\int\frac{\mathrm{d}x}{x^2\sqrt{1+x^2}}
&=\int\frac{t^2}{\sqrt{1+\frac{1}{t^2}}}\left(-\frac{\mathrm{d}t}{t^2}\right)
=-\int\frac{t\,\mathrm{d}t}{\sqrt{1+t^2}}\\
&=-\sqrt{1+t^2}+C
=-\frac{\sqrt{1+x^2}}{x}+C.
\end{aligned}

$$

**解法三（先三角换元，再凑微分）** 令 $x=\tan t$，$\mathrm{d}x=\sec^2t\,\mathrm{d}t$：

$$
\int\frac{\mathrm{d}x}{x^2\sqrt{1+x^2}}
=\int\frac{\sec^2t\,\mathrm{d}t}{\tan^2t\sec t}
=\int\frac{\cos t}{\sin^2t}\,\mathrm{d}t
=-\frac{1}{\sin t}+C.
$$
由 $\sin t=\dfrac{x}{\sqrt{1+x^2}}$ 回代，仍得 $-\dfrac{\sqrt{1+x^2}}{x}+C$。

三种做法结果相同。看到 $\sqrt{1+x^2}$ 与 $x^2$ 同时出现时，倒代换 $x=1/t$ 往往最省事。

## 分部积分法

由乘积的微分公式

$$
\mathrm{d}[u(x)v(x)]=v(x)\,\mathrm{d}u(x)+u(x)\,\mathrm{d}v(x),
$$
两边积分并移项，得

$$
\int u(x)\,\mathrm{d}v(x)=u(x)v(x)-\int v(x)\,\mathrm{d}u(x),
$$
即

$$
\int u(x)v'(x)\,\mathrm{d}x=u(x)v(x)-\int v(x)u'(x)\,\mathrm{d}x.
$$
它把求 $\displaystyle\int uv'$ 转化成求 $\displaystyle\int vu'$。用得好不好，全看 $u$ 与 $v'$ 怎么选。

**例 11** 求 $\displaystyle\int x\cos x\,\mathrm{d}x$。

取 $u=x$，$\mathrm{d}v=\cos x\,\mathrm{d}x$，则 $\mathrm{d}u=\mathrm{d}x$，$v=\sin x$：

$$
\int x\cos x\,\mathrm{d}x=\int x\,\mathrm{d}(\sin x)
=x\sin x-\int\sin x\,\mathrm{d}x
=x\sin x+\cos x+C.
$$
若反过来取 $u=\cos x$、$\mathrm{d}v=x\,\mathrm{d}x$，会得到

$$
\int x\cos x\,\mathrm{d}x=\frac{x^2}{2}\cos x+\int\frac{x^2}{2}\sin x\,\mathrm{d}x,
$$
幂次反而升高，越积越复杂。选 $u$ 的原则是让它求导后变简单。

**例 12** 求 $\displaystyle\int x^2\mathrm{e}^x\,\mathrm{d}x$。

取 $u=x^2$，$\mathrm{d}v=\mathrm{e}^x\,\mathrm{d}x$：

$$
\int x^2\mathrm{e}^x\,\mathrm{d}x=x^2\mathrm{e}^x-2\int x\mathrm{e}^x\,\mathrm{d}x.
$$
对后一项再用一次分部积分，

$$
\int x\mathrm{e}^x\,\mathrm{d}x=x\mathrm{e}^x-\int\mathrm{e}^x\,\mathrm{d}x=x\mathrm{e}^x-\mathrm{e}^x+C,
$$
所以

$$
\int x^2\mathrm{e}^x\,\mathrm{d}x=\mathrm{e}^x(x^2-2x+2)+C.
$$
多项式乘指数、正弦、余弦时，每分部积分一次多项式的次数降一次，直到变成常数为止。

**例 13** 求 $\displaystyle\int\ln x\,\mathrm{d}x$。

取 $u=\ln x$，$\mathrm{d}v=\mathrm{d}x$，则 $\mathrm{d}u=\dfrac{\mathrm{d}x}{x}$，$v=x$：

$$
\int\ln x\,\mathrm{d}x=x\ln x-\int x\cdot\frac{\mathrm{d}x}{x}
=x\ln x-x+C=x(\ln x-1)+C.
$$

**例 14** 求 $\displaystyle\int x\arctan x\,\mathrm{d}x$。

取 $u=\arctan x$，$\mathrm{d}v=x\,\mathrm{d}x$，则 $\mathrm{d}u=\dfrac{\mathrm{d}x}{1+x^2}$，$v=\dfrac{x^2}{2}$：

$$
\begin{aligned}
\int x\arctan x\,\mathrm{d}x
&=\frac{x^2}{2}\arctan x-\frac12\int\frac{x^2}{1+x^2}\,\mathrm{d}x\\
&=\frac{x^2}{2}\arctan x-\frac12\int\left(1-\frac{1}{1+x^2}\right)\mathrm{d}x\\
&=\frac{x^2+1}{2}\arctan x-\frac{x}{2}+C.
\end{aligned}

$$

> **关键结论**：对数、反三角函数与多项式相乘时，取对数或反三角函数为 $u$，因为它们求导后变成有理函数，与 $v$ 的类型统一。

**例 15** 求 $\displaystyle\int\frac{x}{1+\cos x}\,\mathrm{d}x$。

利用 $1+\cos x=2\cos^2\dfrac{x}{2}$：

$$
\frac{x}{1+\cos x}=\frac{x}{2}\sec^2\frac{x}{2},
$$
所以

$$
\begin{aligned}
\int\frac{x}{1+\cos x}\,\mathrm{d}x
&=\int x\,\mathrm{d}\left(\tan\frac{x}{2}\right)
=x\tan\frac{x}{2}-\int\tan\frac{x}{2}\,\mathrm{d}x\\
&=x\tan\frac{x}{2}+2\ln\left|\cos\frac{x}{2}\right|+C.
\end{aligned}

$$

**例 16** 求 $\displaystyle\int\mathrm{e}^x\sin x\,\mathrm{d}x$。

取 $u=\sin x$，$\mathrm{d}v=\mathrm{e}^x\,\mathrm{d}x$：

$$
\int\mathrm{e}^x\sin x\,\mathrm{d}x=\mathrm{e}^x\sin x-\int\mathrm{e}^x\cos x\,\mathrm{d}x.
$$
对右端再分部积分一次（仍取指数为 $v'$）：

$$
\int\mathrm{e}^x\cos x\,\mathrm{d}x=\mathrm{e}^x\cos x+\int\mathrm{e}^x\sin x\,\mathrm{d}x.
$$
代回得

$$
\int\mathrm{e}^x\sin x\,\mathrm{d}x
=\mathrm{e}^x\sin x-\mathrm{e}^x\cos x-\int\mathrm{e}^x\sin x\,\mathrm{d}x.
$$
移项解出

$$
\int\mathrm{e}^x\sin x\,\mathrm{d}x
=\frac{\mathrm{e}^x(\sin x-\cos x)}{2}+C.
$$
同理

$$
\int\mathrm{e}^x\cos x\,\mathrm{d}x
=\frac{\mathrm{e}^x(\sin x+\cos x)}{2}+C.
$$
这类积分分部两次后原积分重新出现，只要系数不为 $1$，就可以移项解方程。

**例 17** 求 $\displaystyle\int\sqrt{x^2+a^2}\,\mathrm{d}x$ 与 $\displaystyle\int\sqrt{x^2-a^2}\,\mathrm{d}x$。

以第一式为例，取 $u=\sqrt{x^2+a^2}$，$\mathrm{d}v=\mathrm{d}x$：

$$
\begin{aligned}
I&=\int\sqrt{x^2+a^2}\,\mathrm{d}x
=x\sqrt{x^2+a^2}-\int\frac{x^2}{\sqrt{x^2+a^2}}\,\mathrm{d}x\\
&=x\sqrt{x^2+a^2}-\int\frac{(x^2+a^2)-a^2}{\sqrt{x^2+a^2}}\,\mathrm{d}x\\
&=x\sqrt{x^2+a^2}-I+a^2\int\frac{\mathrm{d}x}{\sqrt{x^2+a^2}}.
\end{aligned}

$$
移项并用例 8 的结果：

$$
I=\frac12\left[x\sqrt{x^2+a^2}+a^2\ln\left(x+\sqrt{x^2+a^2}\right)\right]+C.
$$
类似地，

$$
\int\sqrt{x^2-a^2}\,\mathrm{d}x
=\frac12\left[x\sqrt{x^2-a^2}-a^2\ln\left|x+\sqrt{x^2-a^2}\right|\right]+C.
$$
第二式同样出现循环：拆分 $x^2=(x^2-a^2)+a^2$ 后得到 $I=x\sqrt{x^2-a^2}-I-a^2\displaystyle\int\frac{\mathrm{d}x}{\sqrt{x^2-a^2}}$，移项并用例 8 即得。

**例 18** 求递推公式 $\displaystyle I_n=\int\frac{\mathrm{d}x}{(x^2+a^2)^n}$。

$n=1$ 时

$$
I_1=\frac1a\arctan\frac{x}{a}+C.
$$
对 $n\geqslant2$，把 $1$ 写成 $\dfrac{(x^2+a^2)-x^2}{a^2}$：

$$
I_n=\frac{1}{a^2}I_{n-1}-\frac{1}{a^2}\int\frac{x^2}{(x^2+a^2)^n}\,\mathrm{d}x.
$$
对后一个积分分部积分，取 $u=x$，$\mathrm{d}v=\dfrac{x\,\mathrm{d}x}{(x^2+a^2)^n}$，则

$$
v=-\frac{1}{2(n-1)(x^2+a^2)^{n-1}},
$$
于是

$$
\int\frac{x^2}{(x^2+a^2)^n}\,\mathrm{d}x
=-\frac{x}{2(n-1)(x^2+a^2)^{n-1}}+\frac{1}{2(n-1)}I_{n-1}.
$$
代回整理得

$$
I_n=\frac{2n-3}{2a^2(n-1)}I_{n-1}
+\frac{x}{2a^2(n-1)(x^2+a^2)^{n-1}},\qquad n\geqslant2.
$$
这是分部积分导出递推公式的典型例子：幂次降一阶，反复使用可降到 $I_1$。

**例 19** 求 $\displaystyle\int(x+1)\sqrt{x^2-2x+5}\,\mathrm{d}x$。

**解法一（换元）** 配方得 $x^2-2x+5=(x-1)^2+4$。令 $x-1=2\tan t$，则 $\mathrm{d}x=2\sec^2t\,\mathrm{d}t$，$\sqrt{x^2-2x+5}=2\sec t$，且 $x+1=2(1+\tan t)$。于是

$$
\begin{aligned}
I&=\int 2(1+\tan t)\cdot2\sec t\cdot2\sec^2t\,\mathrm{d}t
=8\int\sec^3t\,\mathrm{d}t+8\int\tan t\sec^3t\,\mathrm{d}t\\
&=8\int\sec^3t\,\mathrm{d}t+\frac83\sec^3t.
\end{aligned}

$$
其中

$$
\int\sec^3t\,\mathrm{d}t
=\int\sec t\,\mathrm{d}(\tan t)
=\sec t\tan t-\int\tan^2t\sec t\,\mathrm{d}t,
$$
再用 $\tan^2t=\sec^2t-1$：

$$
\int\sec^3t\,\mathrm{d}t
=\sec t\tan t-\int\sec^3t\,\mathrm{d}t+\int\sec t\,\mathrm{d}t,
$$
移项得

$$
\int\sec^3t\,\mathrm{d}t
=\frac12\left[\sec t\tan t+\ln|\sec t+\tan t|\right]+C.
$$
代回

$$
I=\frac83\sec^3t+4\sec t\tan t+4\ln|\sec t+\tan t|+C.
$$
由 $\sec t=\dfrac{\sqrt{x^2-2x+5}}{2}$，$\tan t=\dfrac{x-1}{2}$，最终

$$
I=\frac13(x^2-2x+5)^{3/2}+(x-1)\sqrt{x^2-2x+5}
+4\ln\left|x-1+\sqrt{x^2-2x+5}\right|+C.
$$

**解法二（拆项后分部）** 把 $x+1$ 拆成 $\dfrac12(2x-2)+2$：

$$
\begin{aligned}
I&=\frac12\int(2x-2)\sqrt{x^2-2x+5}\,\mathrm{d}x
+2\int\sqrt{(x-1)^2+4}\,\mathrm{d}x\\
&=\frac12\int\sqrt{x^2-2x+5}\,\mathrm{d}(x^2-2x+5)
+2\int\sqrt{(x-1)^2+4}\,\mathrm{d}x\\
&=\frac13(x^2-2x+5)^{3/2}
+(x-1)\sqrt{x^2-2x+5}
+4\ln\left|x-1+\sqrt{x^2-2x+5}\right|+C.
\end{aligned}

$$
最后一步用了例 17 的公式（取 $a=2$，变量为 $x-1$）。解法二避免处理 $\sec^3t$，明显更简洁。

**例 20** 求 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt{x^2+2\xi x+\eta^2}}$。

配方：

$$
x^2+2\xi x+\eta^2=(x+\xi)^2+(\eta^2-\xi^2).
$$
把 $|\eta^2-\xi^2|$ 记为 $a^2$，则根号内是 $(x+\xi)^2\pm a^2$，正负号取决于 $\eta^2-\xi^2$ 的符号。令 $u=x+\xi$，由例 8 的公式

$$
\int\frac{\mathrm{d}u}{\sqrt{u^2\pm a^2}}=\ln\left|u+\sqrt{u^2\pm a^2}\right|+C,
$$
回代即得

$$
\int\frac{\mathrm{d}x}{\sqrt{x^2+2\xi x+\eta^2}}
=\ln\left|x+\xi+\sqrt{x^2+2\xi x+\eta^2}\right|+C.
$$
两种符号下公式形式相同，只是根号内一个是和、一个是差；差的情形要求 $|x+\xi|>a$，即根号内的二次式为正。

两个特例：

$$
\int\frac{\mathrm{d}x}{\sqrt{x^2-4x+5}}
=\ln\left|x-2+\sqrt{x^2-4x+5}\right|+C,
$$
因为 $x^2-4x+5=(x-2)^2+1$，根号内恒正；

$$
\int\frac{\mathrm{d}x}{\sqrt{x^2-4x+3}}
=\ln\left|x-2+\sqrt{x^2-4x+3}\right|+C,
$$
因为 $x^2-4x+3=(x-2)^2-1$，要求 $|x-2|>1$，这正是被积函数的定义域。

## 补充积分表

由前面的例题汇总，以下公式可直接使用：


$$
\begin{aligned}
&\int\frac{\mathrm{d}x}{x^2+a^2}=\frac1a\arctan\frac{x}{a}+C,
&&\int\frac{\mathrm{d}x}{\sqrt{a^2-x^2}}=\arcsin\frac{x}{a}+C,\\
&\int\frac{\mathrm{d}x}{x^2-a^2}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C,
&&\int\sec x\,\mathrm{d}x=\ln|\sec x+\tan x|+C,\\
&\int\csc x\,\mathrm{d}x=\ln|\csc x-\cot x|+C,
&&\int\sqrt{a^2-x^2}\,\mathrm{d}x=\frac12x\sqrt{a^2-x^2}+\frac{a^2}{2}\arcsin\frac{x}{a}+C,\\
&\int\frac{\mathrm{d}x}{\sqrt{x^2\pm a^2}}=\ln\left|x+\sqrt{x^2\pm a^2}\right|+C,
&&\int\sqrt{x^2\pm a^2}\,\mathrm{d}x=\frac12\left[x\sqrt{x^2\pm a^2}\pm a^2\ln\left|x+\sqrt{x^2\pm a^2}\right|\right]+C.
\end{aligned}

$$

## 有理函数的不定积分

### 哪些积分“积不出”

初等函数的不定积分不一定是初等函数。例如

$$
\int\frac{\sin x}{x}\,\mathrm{d}x,\qquad
\int\mathrm{e}^{-x^2}\,\mathrm{d}x,\qquad
\int\frac{\mathrm{d}x}{\ln x},\qquad
\int\sqrt{1-k^2\sin^2x}\,\mathrm{d}x\ (0<k^2<1)
$$
都不能用基本初等函数经过有限次四则运算与复合表示出来，俗称“积不出”。这里说的“积不出”不是原函数不存在——连续函数一定有原函数（这要等定积分理论建立后才好证明）——而是原函数不是初等函数。

那么什么样的函数，其不定积分一定是初等函数？有理函数就是其中最重要的一类。许多无理函数、三角函数的有理式，也可以通过适当换元化成有理函数。

### 部分分式分解

形如

$$
\frac{p_m(x)}{q_n(x)}
$$
的函数称为有理函数，其中 $p_m$、$q_n$ 分别是 $m$ 次、$n$ 次多项式。

若 $m\geqslant n$（假分式），先做多项式除法：

$$
\frac{p_m(x)}{q_n(x)}=p_{m-n}(x)+\frac{r(x)}{q_n(x)},
$$
其中 $r$ 的次数小于 $n$。多项式部分直接积分，问题化为真分式。以下假定 $m<n$，且 $q_n$ 的最高次项系数为 $1$。

实系数多项式总能分解为一次因式与不可约二次因式的乘积。例如

$$
x^4+1=(x^2-\sqrt2x+1)(x^2+\sqrt2x+1).
$$
设

$$
q_n(x)=\prod_{k=1}^{i}(x-\alpha_k)^{m_k}\prod_{k=1}^{j}(x^2+2\xi_kx+\eta_k^2)^{n_k},
$$
则真分式可分解为

$$
\frac{p_m(x)}{q_n(x)}
=\sum_{k=1}^{i}\sum_{r=1}^{m_k}\frac{\lambda_{kr}}{(x-\alpha_k)^r}
+\sum_{k=1}^{j}\sum_{r=1}^{n_k}\frac{\mu_{kr}x+\nu_{kr}}{(x^2+2\xi_kx+\eta_k^2)^r}.
$$
系数由待定系数法确定：通分后比较分子多项式的各次幂系数，解线性方程组（克莱姆法则保证解存在唯一）。实际计算时常配合代特殊值、比较最高次项系数等技巧减少计算量。

于是有理函数的积分只剩两种基本类型：

(1) $\displaystyle\int\frac{\mathrm{d}x}{(x-\alpha)^n}$。$n=1$ 时为 $\ln|x-\alpha|+C$；$n\geqslant2$ 时为 $-\dfrac{1}{(n-1)(x-\alpha)^{n-1}}+C$。

(2) $\displaystyle\int\frac{\mu x+\nu}{(x^2+2\xi x+\eta^2)^n}\,\mathrm{d}x$（$\xi^2<\eta^2$）。先拆出与分母导数 $2x+2\xi$ 成比例的部分凑微分，剩下的常数倍化为 $\displaystyle\int\frac{\mathrm{d}u}{(u^2+a^2)^n}$，再用例 18 的递推或三角换元。

> **关键结论**：这就证明了：**有理函数的原函数一定是初等函数**。

### 例题

**例 1** 求 $\displaystyle\int\frac{4x^3-13x^2+3x+8}{(x+1)(x-2)(x-1)^2}\,\mathrm{d}x$。

设

$$
\frac{4x^3-13x^2+3x+8}{(x+1)(x-2)(x-1)^2}
=\frac{A}{x+1}+\frac{B}{x-2}+\frac{C}{x-1}+\frac{D}{(x-1)^2}.
$$
通分后分子应恒等：

$$
4x^3-13x^2+3x+8
=A(x-2)(x-1)^2+B(x+1)(x-1)^2+C(x+1)(x-2)(x-1)+D(x+1)(x-2).
$$
令 $x=-1$ 得 $A=1$；令 $x=2$ 得 $B=-2$；令 $x=1$ 得 $D=-1$；比较 $x^3$ 的系数，$A+B+C=4$，故 $C=5$。于是

$$
\begin{aligned}
\int\frac{4x^3-13x^2+3x+8}{(x+1)(x-2)(x-1)^2}\,\mathrm{d}x
&=\int\left(\frac{1}{x+1}-\frac{2}{x-2}+\frac{5}{x-1}-\frac{1}{(x-1)^2}\right)\mathrm{d}x\\
&=\ln\left|\frac{(x+1)(x-1)^5}{(x-2)^2}\right|+\frac{1}{x-1}+C.
\end{aligned}

$$
注意 $\displaystyle\int-\frac{1}{(x-1)^2}\mathrm{d}x=+\frac{1}{x-1}$，符号容易写反。

**例 2** 求 $\displaystyle\int\frac{x^4+x^3+3x^2-1}{(x^2+1)^2(x-1)}\,\mathrm{d}x$。

设

$$
\frac{x^4+x^3+3x^2-1}{(x^2+1)^2(x-1)}
=\frac{A}{x-1}+\frac{Bx+C}{x^2+1}+\frac{Dx+E}{(x^2+1)^2}.
$$
则

$$
x^4+x^3+3x^2-1=A(x^2+1)^2+(Bx+C)(x-1)(x^2+1)+(Dx+E)(x-1).
$$
令 $x=1$ 得 $A=1$；比较 $x^4$ 系数得 $B=0$；比较 $x^3$ 系数得 $C=1$；比较 $x^2$ 系数得 $D=2$；令 $x=0$ 得 $E=1$。

这里也可以用“令 $x^2=-1$”的写法：把 $x=\mathrm{i}$ 形式地代入恒等式，比较实部虚部，同样得到 $D=2$、$E=1$。因为等式对一切实数 $x$ 成立，作为多项式恒等式它也对复数成立，所以这种代入是合法的，只是书写上的捷径。

于是

$$
\begin{aligned}
\int\frac{x^4+x^3+3x^2-1}{(x^2+1)^2(x-1)}\,\mathrm{d}x
&=\int\left(\frac{1}{x-1}+\frac{1}{x^2+1}+\frac{2x+1}{(x^2+1)^2}\right)\mathrm{d}x\\
&=\ln|x-1|+\arctan x-\frac{1}{x^2+1}+\frac{x}{2(x^2+1)}+\frac12\arctan x+C\\
&=\ln|x-1|+\frac32\arctan x+\frac{x-2}{2(x^2+1)}+C.
\end{aligned}

$$
其中用到 $\displaystyle\int\frac{2x}{(x^2+1)^2}\mathrm{d}x=-\frac{1}{x^2+1}$，以及

$$
\int\frac{\mathrm{d}x}{(x^2+1)^2}=\frac{x}{2(x^2+1)}+\frac12\arctan x+C.
$$
这个公式可由 $x=\tan t$ 推出：$\mathrm{d}x=\sec^2t\,\mathrm{d}t$，分母为 $\sec^4t$，积分化为 $\int\cos^2t\,\mathrm{d}t$。

### 可化为有理函数：根式

形如

$$
\int R\left(x,\sqrt[n]{\frac{\xi x+\eta}{\mu x+\nu}}\right)\mathrm{d}x
$$
的积分（$R$ 表示二元有理函数），令

$$
\sqrt[n]{\frac{\xi x+\eta}{\mu x+\nu}}=t,
$$
则

$$
x=\varphi(t)=\frac{-\nu t^n+\eta}{\mu t^n-\xi},\qquad \mathrm{d}x=\varphi'(t)\,\mathrm{d}t.
$$
有理函数的复合、有理函数的导数仍是有理函数，所以换元后化为有理函数的积分。特例 $\mu=0$ 时，就是 $\int R(x,\sqrt[n]{\xi x+\eta})\,\mathrm{d}x$。

**例 3** 求 $\displaystyle\int\frac{x\,\mathrm{d}x}{\sqrt{4x-3}}$。

令 $\sqrt{4x-3}=t$，则 $x=\dfrac{t^2+3}{4}$，$\mathrm{d}x=\dfrac{t}{2}\,\mathrm{d}t$：

$$
\int\frac{x\,\mathrm{d}x}{\sqrt{4x-3}}
=\int\frac{t^2+3}{4}\cdot\frac1t\cdot\frac{t}{2}\,\mathrm{d}t
=\frac18\int(t^2+3)\,\mathrm{d}t
=\frac{t^3}{24}+\frac{3t}{8}+C.
$$
回代 $t=\sqrt{4x-3}$：

$$
\int\frac{x\,\mathrm{d}x}{\sqrt{4x-3}}
=\frac{\sqrt{4x-3}}{12}(2x+3)+C.
$$

**例 4** 求 $\displaystyle\int\frac{\mathrm{d}x}{x(\sqrt[3]{x}-\sqrt x)}$。

两个根号的指数分别是 $\dfrac13$ 与 $\dfrac12$，最小公倍数是 $6$，令 $x=t^6$（$x>0$），则 $\mathrm{d}x=6t^5\,\mathrm{d}t$，$\sqrt[3]{x}=t^2$，$\sqrt x=t^3$：

$$
\begin{aligned}
\int\frac{\mathrm{d}x}{x(\sqrt[3]{x}-\sqrt x)}
&=\int\frac{6t^5\,\mathrm{d}t}{t^6(t^2-t^3)}
=6\int\frac{\mathrm{d}t}{t^3(1-t)}.
\end{aligned}

$$
分解

$$
\frac{1}{t^3(1-t)}=\frac1t+\frac1{t^2}+\frac1{t^3}+\frac1{1-t},
$$
积分得

$$
6\left(\ln|t|-\frac1t-\frac{1}{2t^2}-\ln|1-t|\right)+C
=6\ln\left|\frac{t}{1-t}\right|-\frac6t-\frac3{t^2}+C.
$$
回代 $t=x^{1/6}$：

$$
\int\frac{\mathrm{d}x}{x(\sqrt[3]{x}-\sqrt x)}
=6\ln\frac{x^{1/6}}{|x^{1/6}-1|}-\frac{6}{x^{1/6}}-\frac{3}{x^{1/3}}+C.
$$

**例 5** 求 $\displaystyle\int\frac{1}{x}\sqrt{\frac{1+x}{1-x}}\,\mathrm{d}x$。

令 $\sqrt{\dfrac{1+x}{1-x}}=t$，则 $t^2=\dfrac{1+x}{1-x}$，解出

$$
x=\frac{t^2-1}{t^2+1},\qquad \mathrm{d}x=\frac{4t}{(t^2+1)^2}\,\mathrm{d}t.
$$
于是

$$
\begin{aligned}
\int\frac{1}{x}\sqrt{\frac{1+x}{1-x}}\,\mathrm{d}x
&=\int\frac{t^2+1}{t^2-1}\cdot t\cdot\frac{4t}{(t^2+1)^2}\,\mathrm{d}t
=4\int\frac{t^2}{(t^2-1)(t^2+1)}\,\mathrm{d}t\\
&=2\int\left(\frac{1}{t^2-1}+\frac{1}{t^2+1}\right)\mathrm{d}t\\
&=\ln\left|\frac{t-1}{t+1}\right|+2\arctan t+C.
\end{aligned}

$$
回代 $t=\sqrt{\dfrac{1+x}{1-x}}$（$-1<x<1$ 且 $x\ne0$）：

$$
\int\frac{1}{x}\sqrt{\frac{1+x}{1-x}}\,\mathrm{d}x
=\ln\left|\frac{\sqrt{1+x}-\sqrt{1-x}}{\sqrt{1+x}+\sqrt{1-x}}\right|
+2\arctan\sqrt{\frac{1+x}{1-x}}+C.
$$

**例 6** 求 $\displaystyle\int\frac{\mathrm{d}x}{\sqrt[3]{(x-1)^2(x+1)^4}}$。

先提出一个因子，把被积函数写成适合换元的形式：

$$
\frac{1}{\sqrt[3]{(x-1)^2(x+1)^4}}
=\frac{1}{(x+1)^2}\sqrt[3]{\frac{(x+1)^2}{(x-1)^2}}.
$$
令

$$
\sqrt[3]{\frac{x+1}{x-1}}=t,
$$
则 $\dfrac{x+1}{x-1}=t^3$，$x=\dfrac{t^3+1}{t^3-1}$，

$$
\mathrm{d}x=\frac{3t^2(t^3-1)-3t^2(t^3+1)}{(t^3-1)^2}\,\mathrm{d}t
=-\frac{6t^2}{(t^3-1)^2}\,\mathrm{d}t.
$$
又 $(x+1)^2=\dfrac{4t^6}{(t^3-1)^2}$，所以

$$
\begin{aligned}
\int\frac{\mathrm{d}x}{\sqrt[3]{(x-1)^2(x+1)^4}}
&=\int\frac{t^2}{(x+1)^2}\,\mathrm{d}x
=\int t^2\cdot\frac{(t^3-1)^2}{4t^6}\cdot\left(-\frac{6t^2}{(t^3-1)^2}\right)\mathrm{d}t\\
&=-\frac32\int\frac{\mathrm{d}t}{t^2}
=\frac{3}{2t}+C
=\frac32\sqrt[3]{\frac{x-1}{x+1}}+C.
\end{aligned}
$$

### 可化为有理函数：三角函数

形如 $\displaystyle\int R(\sin x,\cos x)\,\mathrm{d}x$ 的积分，可用万能公式

$$
t=\tan\frac{x}{2},\qquad
\sin x=\frac{2t}{1+t^2},\qquad
\cos x=\frac{1-t^2}{1+t^2},\qquad
\mathrm{d}x=\frac{2\,\mathrm{d}t}{1+t^2}
$$
化为 $t$ 的有理函数的积分。因为 $\tan x$、$\cot x$、$\sec x$、$\csc x$ 都是 $\sin x$、$\cos x$ 的有理函数，所以一切三角函数的有理式都能用这个办法处理。

> **理解关键**：万能公式一定能用，但不一定最省事。先看有没有更简单的凑微分或三角变形，往往能少算很多。

**例 7** 求 $\displaystyle\int\frac{\mathrm{d}x}{4+4\sin x+\cos x}$。

令 $t=\tan\dfrac{x}{2}$，则

$$
\begin{aligned}
4+4\sin x+\cos x
&=4+\frac{8t}{1+t^2}+\frac{1-t^2}{1+t^2}
=\frac{3t^2+8t+5}{1+t^2},
\end{aligned}

$$
所以

$$
\int\frac{\mathrm{d}x}{4+4\sin x+\cos x}
=\int\frac{2\,\mathrm{d}t}{3t^2+8t+5}
=\int\frac{2\,\mathrm{d}t}{(3t+5)(t+1)}.
$$
分解

$$
\frac{2}{(3t+5)(t+1)}=\frac{1}{t+1}-\frac{3}{3t+5},
$$
积分得

$$
\ln|t+1|-\ln|3t+5|+C
=\ln\left|\frac{\tan\frac{x}{2}+1}{3\tan\frac{x}{2}+5}\right|+C.
$$

**例 8** 求 $\displaystyle I=\int\frac{\cot x}{1+\sin x}\,\mathrm{d}x$。

**解法一（万能公式）** 令 $t=\tan\dfrac{x}{2}$，则 $\cot x=\dfrac{1-t^2}{2t}$，$\sin x=\dfrac{2t}{1+t^2}$，$\mathrm{d}x=\dfrac{2\,\mathrm{d}t}{1+t^2}$：

$$
\begin{aligned}
I&=\int\frac{1-t^2}{2t}\cdot\frac{1+t^2}{1+t^2+2t}\cdot\frac{2\,\mathrm{d}t}{1+t^2}
=\int\frac{1-t^2}{t(1+t)^2}\,\mathrm{d}t\\
&=\int\frac{1-t}{t(1+t)}\,\mathrm{d}t
=\int\left(\frac1t-\frac{2}{1+t}\right)\mathrm{d}t
=\ln\left|\frac{t}{(1+t)^2}\right|+C.
\end{aligned}

$$
回代 $t=\tan\dfrac{x}{2}$。

**解法二（拆项凑微分）** 把 $\cot x$ 写成 $\dfrac{\cos x}{\sin x}$：

$$
\begin{aligned}
I&=\int\frac{\cos x\,\mathrm{d}x}{\sin x(1+\sin x)}
=\int\left(\frac{1}{\sin x}-\frac{1}{1+\sin x}\right)\mathrm{d}(\sin x)\\
&=\ln|\sin x|-\ln|1+\sin x|+C
=\ln\left|\frac{\sin x}{1+\sin x}\right|+C.
\end{aligned}

$$
解法二明显更短。两种结果并不矛盾：由 $\sin x=\dfrac{2t}{1+t^2}$ 得 $\dfrac{\sin x}{1+\sin x}=\dfrac{2t}{(1+t)^2}$，与解法一的 $\dfrac{t}{(1+t)^2}$ 只差常数因子 $2$，即两组原函数相差常数 $\ln2$。不定积分相差常数是允许的。

## 课堂小结

不定积分是求导的逆运算，核心公式只有两条：$\displaystyle\int f(x)\,\mathrm{d}x=F(x)+C$ 与 $\displaystyle\int u\,\mathrm{d}v=uv-\int v\,\mathrm{d}u$。计算路线可以归纳为：

- 先看能否用基本积分表和线性性质直接拆；
- 复合结构明显、内层导数恰好在外层出现时，用第一类换元（凑微分）；
- 含 $\sqrt{a^2-x^2}$、$\sqrt{x^2\pm a^2}$ 等根式时，用 $x=a\sin t$、$a\sec t$、$a\tan t$ 去根号；含 $\sqrt[n]{x}$ 时令 $x=t^n$；
- 多项式乘指数、三角、对数、反三角时用分部积分，按“求导后变简单”的原则选 $u$；
- 有理函数走“除法 → 因式分解 → 部分分式 → 两类基本积分”的固定流程。

易错点集中在三处：**积分常数**不能漏，且在不同定义区间上常数可以不同；**绝对值**在 $\ln|x|$、$\ln|x-a|$、$\ln|x+\sqrt{x^2-a^2}|$ 中不能随意去掉；**定义区间**要先看清，$x=0$、$x=\pm a$、$\cos x=0$ 这些点会把定义域分成几段，换元时也要保证所选分支上反函数存在、根号取非负值。

---

原件：[23不定积分.pdf](https://drive.google.com/file/d/1xTwHcfuqj4DQCpiTyIJbolHUGGRI--ma/view?usp=drivesdk)
