---
slug: "11-derivatives-and-differentiation-rules"
title: "导数概念与求导法则"
summary: "第 11 讲：导数概念与求导法则。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "11"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "11导数概念与求导法则.pdf"
    url: "https://drive.google.com/file/d/1Qeldw5H7bbVVAaBLfH2rnR-KZh8gdYCv/view?usp=drivesdk"
---

导数回答的是一个很具体的问题：函数在一点附近变化得有多快。把"变化得快慢"写成可计算的形式，就是差商的极限；此后所有的求导公式，都是把这个极限在各类函数上算出来的结果。这一讲先把定义立住，再用定义算出基本初等函数的导数，然后建立四则运算、反函数、复合函数三条法则，使求导从"每次算极限"变成"套公式加链式法则"。

## 从三个问题到同一个极限

**瞬时速度。** 物体在 $t$ 到 $t+\Delta t$ 时间内的平均速度是


$$
\bar v=\frac{S(t+\Delta t)-S(t)}{\Delta t}.
$$

$\Delta t$ 越小，这段平均速度越接近时刻 $t$ 的瞬时速度。于是定义


$$
v(t)=\lim_{\Delta t\to 0}\frac{S(t+\Delta t)-S(t)}{\Delta t}.
$$

**细线的密度。** 一段长为 $\Delta x$ 的细线质量为 $\Delta m$，平均线密度是 $\Delta m/\Delta x$；令 $\Delta x\to 0$，得 $x$ 处的线密度


$$
\rho(x)=\lim_{\Delta x\to 0}\frac{m(x+\Delta x)-m(x)}{\Delta x}.
$$

**曲线的切线。** 过曲线 $y=f(x)$ 上两点 $(x,f(x))$ 与 $(x+\Delta x,f(x+\Delta x))$ 的割线斜率是


$$
\frac{f(x+\Delta x)-f(x)}{\Delta x}.
$$

当 $\Delta x\to0$ 时割线的极限位置就是切线，其斜率


$$
k=\lim_{\Delta x\to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}.
$$

> **关键结论**：三个问题的背景不同，数学结构完全一样：都是"函数的增量除以自变量的增量，再让自变量的增量趋于零"。把这个结构抽象出来，就是导数。

## 导数的定义

**定义 1** 设函数 $f(x)$ 在点 $x_0$ 的某邻域内有定义。

(1) 若极限


$$
\lim_{\Delta x\to 0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
$$

存在且有限，则称 $f(x)$ 在点 $x_0$ **可导**，该极限值称为 $f(x)$ 在 $x_0$ 的**导数**，记作 $f'(x_0)$。

(2) 若左极限与右极限


$$
\lim_{\Delta x\to 0^-}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x},\qquad \lim_{\Delta x\to 0^+}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
$$

存在且有限，则分别称为 $f(x)$ 在 $x_0$ 的**左导数**与**右导数**，记作 $f'_-(x_0)$、$f'_+(x_0)$。

(3) 设 $y=f(x)$ 定义在闭区间 $[a,b]$ 上。若 $f$ 在开区间 $(a,b)$ 内可导，且 $f'_+(a)$ 与 $f'_-(b)$ 存在且有限，则称 $f$ 在 $[a,b]$ 上可导，此时 $f'(x),\ x\in[a,b]$ 称为 $f$ 在 $[a,b]$ 上的**导函数**。

导数的记号还有


$$
y',\qquad \frac{\mathrm dy}{\mathrm dx},\qquad \left.\frac{\mathrm df}{\mathrm dx}\right|_{x=x_0}.
$$

把定义中的 $x_0$ 换成一般的 $x$，得到的 $f'(x)$ 是一个新的函数，称为导函数；$f'(x_0)$ 就是导函数在 $x_0$ 的值。

## 定义中的四个细节

**一、可导等价于左右导数存在且相等。** 因为 $\Delta x\to0$ 的极限存在，当且仅当 $\Delta x\to0^-$ 与 $\Delta x\to0^+$ 两个方向的极限存在且相等。分段函数在分界点是否可导，就靠这一条判断。

**二、可导必连续，连续不一定可导。** 若 $f$ 在 $x_0$ 可导，则


$$
\Delta y=f(x_0+\Delta x)-f(x_0)=\frac{\Delta y}{\Delta x}\cdot\Delta x\to f'(x_0)\cdot 0=0\qquad(\Delta x\to0),
$$

故 $f$ 在 $x_0$ 连续。反过来不成立：$f(x)=|x|$ 在 $x=0$ 连续，但


$$
f'_-(0)=\lim_{x\to0^-}\frac{|x|-0}{x}=-1,\qquad f'_+(0)=\lim_{x\to0^+}\frac{|x|-0}{x}=1,
$$

左右导数不相等，故不可导。几何上，曲线在该点出现"尖角"，没有唯一的切线。

**三、$f'_-(x_0)$ 与 $f'(x_0-)$ 不是一回事。** 前者的下标在撇号右下角，表示$x_0$ 处的左导数，是一个数；后者是导函数 $f'(x)$ 在 $x_0$ 处的左极限。两者可以一个存在、另一个不存在。后面会看到 $f(x)=x^2\sin\frac1x$ 在 $0$ 处可导，但导函数在 $0$ 处的单侧极限不存在。

**四、可导是逐点的性质。** 一个函数可以在某些点可导、在另一些点不可导，例如 $y=|x|$ 除 $0$ 外处处可导。

**例 1** 设


$$
f(x)=\begin{cases} x^2+b, & x>2,\\[2pt] ax+1, & x\le 2,\end{cases}
$$

确定 $a,b$，使 $f(x)$ 在 $x=2$ 处可导。

**解** 可导必连续，故先要求 $f$ 在 $x=2$ 连续：


$$
\lim_{x\to2^+}f(x)=\lim_{x\to2^+}(x^2+b)=4+b=f(2)=2a+1,
$$

即


$$
4+b=2a+1. \tag{1}
$$

再要求左右导数相等。由定义，


$$
f'_-(2)=\lim_{x\to2^-}\frac{ax+1-(2a+1)}{x-2}=\lim_{x\to2^-}\frac{a(x-2)}{x-2}=a,
$$


$$
f'_+(2)=\lim_{x\to2^+}\frac{x^2+b-(4+b)}{x-2}=\lim_{x\to2^+}\frac{x^2-4}{x-2}=4.
$$

故 $a=4$。代入 (1) 得 $b=2a+1-4=5$。此时 $f'(2)=4$。

> **易错点**：顺序不能颠倒：先用连续定出一个方程，再用左右导数相等定出另一个。若只用左右导数相等而不管连续，得到的 $a,b$ 可能使函数在分界点直接断开。

## 基本初等函数的导数

求导数的过程就是算一个极限，几个基本函数的结果要能独立推出来。

**常函数。** $f(x)=c$，则 $\Delta y=0$，


$$
(c)'=0.
$$

**幂函数（正整数次）。** 由二项式展开，


$$
(x+\Delta x)^n-x^n=nx^{n-1}\Delta x+C_n^2x^{n-2}(\Delta x)^2+\cdots+(\Delta x)^n,
$$

除以 $\Delta x$ 后令 $\Delta x\to0$，得


$$
(x^n)'=nx^{n-1}.
$$

**正弦与余弦。** 用和差化积，


$$
\sin(x+\Delta x)-\sin x=2\cos\left(x+\frac{\Delta x}{2}\right)\sin\frac{\Delta x}{2},
$$

于是


$$
(\sin x)'=\lim_{\Delta x\to0}\cos\left(x+\frac{\Delta x}{2}\right)\cdot\frac{\sin(\Delta x/2)}{\Delta x/2}=\cos x.
$$

同理


$$
(\cos x)'=\lim_{\Delta x\to0}\frac{-2\sin(x+\Delta x/2)\sin(\Delta x/2)}{\Delta x}=-\sin x.
$$

**对数函数。**


$$
(\ln x)'=\lim_{\Delta x\to0}\frac{\ln(1+\Delta x/x)}{\Delta x}=\lim_{\Delta x\to0}\frac{\Delta x/x}{\Delta x}=\frac1x,
$$

这里用了 $\ln(1+u)\sim u\ (u\to0)$。

**指数函数。**


$$
(\mathrm e^x)'=\lim_{\Delta x\to0}\mathrm e^x\cdot\frac{\mathrm e^{\Delta x}-1}{\Delta x}=\mathrm e^x,
$$

因为 $\mathrm e^h-1\sim h$。对一般的底数，


$$
(a^x)'=\lim_{\Delta x\to0}a^x\cdot\frac{a^{\Delta x}-1}{\Delta x}=a^x\ln a,
$$

因为 $a^h-1=\mathrm e^{h\ln a}-1\sim h\ln a$。

**例 2** 求幂函数 $y=x^\alpha\ (x>0)$ 的导函数，$\alpha$ 为任意实数。

**解** 提出 $x^\alpha$ 后凑成 $(1+u)^\alpha$ 的形式：


$$
\frac{(x+\Delta x)^\alpha-x^\alpha}{\Delta x}=x^{\alpha-1}\cdot\frac{\left(1+\frac{\Delta x}{x}\right)^\alpha-1}{\frac{\Delta x}{x}}.
$$

由 $(1+u)^\alpha=1+\alpha u+o(u)$，第二个因子趋于 $\alpha$，故


$$
(x^\alpha)'=\alpha x^{\alpha-1}.
$$

对具体的 $\alpha$，定义域与可导范围可能比 $x>0$ 更大，需要单独看：

- $y=x^n\ (n\in\mathbb N)$：定义域 $\mathbb R$，$y'=nx^{n-1}$ 在 $\mathbb R$ 上成立；
- $y=\dfrac1{x^n}\ (n\in\mathbb N)$：定义域 $\mathbb R\setminus\{0\}$，$y'=-\dfrac{n}{x^{n+1}}$，$x\ne0$；
- $y=x^{2/3}=\sqrt[3]{x^2}$：定义域 $\mathbb R$，$y'=\dfrac{2}{3\sqrt[3]{x}}$，$x\ne0$；在 $x=0$ 处差商为 $|\Delta x|^{-1/3}\operatorname{sgn}\Delta x$，趋于无穷，故不可导；
- $y=x^{1/2}=\sqrt x$：定义域 $[0,+\infty)$，$y'=\dfrac1{2\sqrt x}$ 只在 $x>0$ 成立，在 $x=0$ 处右导数不存在（趋于 $+\infty$）。

## 导数的几何意义

$f'(x_0)$ 是曲线 $y=f(x)$ 在点 $(x_0,f(x_0))$ 处切线的斜率，切线方程为


$$
y=f(x_0)+f'(x_0)(x-x_0).
$$

过该点且与切线垂直的直线是法线，当 $f'(x_0)\ne0$ 时法线方程为


$$
y=f(x_0)-\frac{1}{f'(x_0)}(x-x_0).
$$

**例 3** 设抛物线 $y^2=2px\ (p>0)$，焦点为 $A\left(\frac p2,0\right)$。说明平行于 $x$ 轴射向抛物线内壁的光线经反射后都经过 $A$。

**解** 设 $P(x_0,y_0)$ 在抛物线上，$y_0\ne0$。把 $y$ 看作 $x$ 的函数，两边对 $x$ 求导得 $2yy'=2p$，故


$$
y'=\frac{p}{y_0}.
$$

切线方程为


$$
y-y_0=\frac{p}{y_0}(x-x_0),
$$

两边乘 $y_0$ 并利用 $y_0^2=2px_0$：


$$
yy_0-y_0^2=p(x-x_0)\ \Longrightarrow\ yy_0=p(x+x_0).
$$

令 $y=0$，得切线与 $x$ 轴的交点 $T(-x_0,0)$。于是


$$
|TF|=\frac p2+x_0 .
$$

另一方面，$P$ 到焦点的距离


$$
|PF|=\sqrt{\left(x_0-\frac p2\right)^2+y_0^2}=\sqrt{x_0^2-px_0+\frac{p^2}{4}+2px_0}=\sqrt{\left(x_0+\frac p2\right)^2}=x_0+\frac p2 .
$$

所以 $|TF|=|PF|$，三角形 $TFP$ 是以 $F$ 为顶点的等腰三角形，故


$$
\angle FTP=\angle TPF.
$$

$TP$ 是切线，$\angle FTP$ 是切线与 $x$ 轴（入射光方向）的夹角，$\angle TPF$ 是切线与 $PF$ 的夹角。两者相等正是反射定律：入射角等于反射角，反射光线沿 $FP$ 方向，必定过焦点 $F=A$。太阳灶、手电筒、汽车大灯都是这个性质的用法。

## 求导的四则运算法则

**定理 1（线性）** 设 $f,g$ 在区间 $I$ 上可导，$c_1,c_2$ 为常数，则 $c_1f+c_2g$ 在 $I$ 上可导，且


$$
(c_1f(x)+c_2g(x))'=c_1f'(x)+c_2g'(x).
$$

**证明** 由定义及极限的四则运算，


$$
\begin{aligned}
(c_1f+c_2g)'(x)
&=\lim_{\Delta x\to0}\frac{c_1f(x+\Delta x)+c_2g(x+\Delta x)-c_1f(x)-c_2g(x)}{\Delta x}\\
&=c_1\lim_{\Delta x\to0}\frac{f(x+\Delta x)-f(x)}{\Delta x}+c_2\lim_{\Delta x\to0}\frac{g(x+\Delta x)-g(x)}{\Delta x}\\
&=c_1f'(x)+c_2g'(x).
\end{aligned}

$$

**定理 2（乘积）** 设 $f,g$ 在区间 $I$ 上可导，则


$$
[f(x)g(x)]'=f'(x)g(x)+f(x)g'(x).
$$

**证明** 关键是把分子凑成两项，各自配出一个差商：


$$
\begin{aligned}
&\frac{f(x+h)g(x+h)-f(x)g(x)}{h}\\
={}&\frac{f(x+h)g(x+h)-f(x+h)g(x)}{h}+\frac{f(x+h)g(x)-f(x)g(x)}{h}\\
={}&f(x+h)\cdot\frac{g(x+h)-g(x)}{h}+g(x)\cdot\frac{f(x+h)-f(x)}{h}.
\end{aligned}

$$

令 $h\to0$。由 $f$ 可导从而连续，$f(x+h)\to f(x)$；两个差商分别趋于 $g'(x)$ 与 $f'(x)$。故极限为 $f(x)g'(x)+f'(x)g(x)$。

**定理 3（倒数）** 设 $g$ 在区间 $I$ 上可导且 $g(x)\ne0$，则


$$
\left(\frac1{g(x)}\right)'=-\frac{g'(x)}{[g(x)]^2}.
$$

**证明** 记 $y=1/g(x)$，


$$
\begin{aligned}
\left(\frac1g\right)'(x)
&=\lim_{\Delta x\to0}\frac{\frac1{g(x+\Delta x)}-\frac1{g(x)}}{\Delta x}\\
&=\lim_{\Delta x\to0}\frac{g(x)-g(x+\Delta x)}{g(x+\Delta x)g(x)\Delta x}
=-\frac{g'(x)}{[g(x)]^2},
\end{aligned}

$$

这里用了 $g(x+\Delta x)\to g(x)$。

**推论（商）** 当 $g(x)\ne0$ 时，把 $f/g$ 看成 $f\cdot\frac1g$，用乘积与倒数法则：


$$
\left(\frac{f(x)}{g(x)}\right)'=\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}.
$$

**例 4** 求 $y=5\log_a x+3^x\ (a>0,\ a\ne1)$ 的导函数。

**解**


$$
y'=\frac{5}{x\ln a}+3^x\ln 3.
$$

**例 5** 求下列函数的导函数：

(1) $y=3x\cos x$；(2) $y=\dfrac{\sin x}{x}$。

**解** (1) 用乘积法则：


$$
y'=3\cos x+3x\cdot(-\sin x)=3\cos x-3x\sin x.
$$

(2) 用商法则：


$$
y'=\frac{(\sin x)'x-\sin x\cdot(x)'}{x^2}=\frac{x\cos x-\sin x}{x^2}.
$$

**例 6** 求 $\sec x$ 与 $\tan x$ 的导函数。

**解** $\sec x=\dfrac1{\cos x}$，由倒数法则，


$$
(\sec x)'=\frac{-(\cos x)'}{\cos^2x}=\frac{\sin x}{\cos^2x}=\tan x\sec x.
$$

$\tan x=\dfrac{\sin x}{\cos x}$，由商法则，


$$
(\tan x)'=\frac{\cos x\cdot\cos x-\sin x\cdot(-\sin x)}{\cos^2x}=\frac{\cos^2x+\sin^2x}{\cos^2x}=\sec^2x.
$$

又 $\sec^2x=1+\tan^2x=\dfrac1{\cos^2x}$，三种写法等价。同理


$$
(\csc x)'=-\cot x\csc x,\qquad (\cot x)'=-\csc^2x.
$$

**例 7** 求双曲函数 $\operatorname{sh}x=\dfrac{\mathrm e^x-\mathrm e^{-x}}2$、$\operatorname{ch}x=\dfrac{\mathrm e^x+\mathrm e^{-x}}2$ 的导函数。

**解** 先求 $\left(\mathrm e^{-x}\right)'$。由定义，


$$
\left(\mathrm e^{-x}\right)'=\lim_{h\to0}\frac{\mathrm e^{-(x+h)}-\mathrm e^{-x}}{h}=\mathrm e^{-x}\lim_{h\to0}\frac{\mathrm e^{-h}-1}{h}=-\mathrm e^{-x}.
$$

于是


$$
(\operatorname{sh}x)'=\frac{\mathrm e^x+\mathrm e^{-x}}2=\operatorname{ch}x,\qquad (\operatorname{ch}x)'=\frac{\mathrm e^x-\mathrm e^{-x}}2=\operatorname{sh}x.
$$

双曲函数与三角函数在求导上只差一个符号：$(\operatorname{ch}x)'=\operatorname{sh}x$ 没有负号。

## 反函数求导法则

**定理 4** 设 $y=f(x)$ 在 $(a,b)$ 上连续、严格单调、可导，且 $f'(x)\ne0$。记


$$
\alpha=\min\{f(a+),f(b-)\},\qquad \beta=\max\{f(a+),f(b-)\},
$$

则反函数 $x=f^{-1}(y)$ 在 $(\alpha,\beta)$ 上可导，且


$$
\left(f^{-1}(y)\right)'=\frac{1}{f'(x)},\qquad y=f(x).
$$

**证明** 由反函数连续性定理，$f^{-1}$ 在 $(\alpha,\beta)$ 上存在、连续且严格单调。严格单调保证


$$
\Delta y=f(x+\Delta x)-f(x)\ne0\iff\Delta x=f^{-1}(y+\Delta y)-f^{-1}(y)\ne0,
$$

并且由连续性，$\Delta y\to0$ 时 $\Delta x\to0$。于是


$$
\begin{aligned}
\left(f^{-1}\right)'(y)
&=\lim_{\Delta y\to0}\frac{f^{-1}(y+\Delta y)-f^{-1}(y)}{\Delta y}
=\lim_{\Delta x\to0}\frac{\Delta x}{f(x+\Delta x)-f(x)}\\
&=\lim_{\Delta x\to0}\frac{1}{\dfrac{f(x+\Delta x)-f(x)}{\Delta x}}=\frac{1}{f'(x)}.
\end{aligned}

$$

公式右端的自变量是 $x$，左端是 $y$，两者由 $y=f(x)$ 联系。使用时通常把结果再写成 $y$ 的表达式。

> **补充说明**
>
> 严格单调保证反函数存在，连续性保证它在值域区间上也连续。这样 $\Delta y\to0$ 时有 $\Delta x\to0$，才能把反函数的差商写成原函数差商的倒数并取极限。若 $f'(x_0)=0$，这个倒数的绝对值趋于无穷，反函数在对应点没有有限导数。
>
> 例如 $f(x)=x^3$ 在 $\mathbb R$ 上连续、严格单调、可导，但 $f'(0)=0$。它的反函数 $f^{-1}(y)=\sqrt[3]{y}$ 在 $y=0$ 处的差商为
>
> $$
> \frac{\sqrt[3]{0+h}-0}{h}=\frac{1}{h^{2/3}}\to+\infty,
> $$
>
> 故不可导。这说明 $f'\ne0$ 不是技术性条件，去掉它结论就不成立。
>
> $\alpha,\beta$ 由单侧极限 $f(a+)$ 与 $f(b-)$ 决定，即使端点本身没有函数值也可以确定。$(\alpha,\beta)$ 是 $f$ 的值域和 $f^{-1}$ 的定义域，$f^{-1}$ 的值域是 $(a,b)$。

**例 8** 求 $y=\arctan x$ 与 $y=\arcsin x$ 的导函数。

**解** $y=\arctan x$ 是 $x=\tan y$ 的反函数，$\tan y$ 在 $\left(-\frac\pi2,\frac\pi2\right)$ 上满足定理条件，且 $(\tan y)'=\sec^2y\ne0$：


$$
(\arctan x)'=\frac{1}{(\tan y)'}=\frac{1}{\sec^2y}=\frac{1}{1+\tan^2y}=\frac{1}{1+x^2}.
$$

$y=\arcsin x$ 是 $x=\sin y,\ y\in\left(-\frac\pi2,\frac\pi2\right)$ 的反函数，$\cos y>0$：


$$
(\arcsin x)'=\frac{1}{\cos y}=\frac{1}{\sqrt{1-\sin^2y}}=\frac{1}{\sqrt{1-x^2}},\qquad -1<x<1.
$$

同理


$$
(\arccos x)'=-\frac{1}{\sqrt{1-x^2}},\qquad (\operatorname{arccot}x)'=-\frac{1}{1+x^2}.
$$

$\arccos$ 与 $\operatorname{arccot}$ 带负号，是因为它们作为反函数时是单调减少的。

## 常用导数公式


$$
(C)'=0,\qquad (x^\alpha)'=\alpha x^{\alpha-1},\qquad (a^x)'=a^x\ln a,\qquad (\mathrm e^x)'=\mathrm e^x,
$$


$$
(\log_ax)'=\frac{1}{x\ln a},\qquad (\ln x)'=\frac1x,
$$


$$
(\sin x)'=\cos x,\qquad (\cos x)'=-\sin x,\qquad (\tan x)'=\sec^2x=1+\tan^2x,
$$


$$
(\cot x)'=-\csc^2x,\qquad (\sec x)'=\tan x\sec x,\qquad (\csc x)'=-\cot x\csc x,
$$


$$
(\arcsin x)'=\frac{1}{\sqrt{1-x^2}},\qquad (\arccos x)'=-\frac{1}{\sqrt{1-x^2}},
$$


$$
(\arctan x)'=\frac{1}{1+x^2},\qquad (\operatorname{arccot}x)'=-\frac{1}{1+x^2},
$$


$$
(\operatorname{sh}x)'=\operatorname{ch}x,\qquad (\operatorname{ch}x)'=\operatorname{sh}x.
$$

> **理解关键**：这张表里的每一条都能由定义或前面的法则推出，记不住时至少要知道怎么推：$\arcsin$、$\arctan$ 靠反函数法则，$\sec$、$\tan$ 靠商法则，$\operatorname{sh}$、$\operatorname{ch}$ 靠指数函数。

## 多因子乘积

多个函数的乘积可以逐次使用乘积法则。对 $n$ 个因子，


$$
\left(\prod_{i=1}^n f_i(x)\right)'=\sum_{j=1}^n f_j'(x)\prod_{i\ne j}f_i(x),
$$

即每次只对一个因子求导，其余照抄，再把 $n$ 个结果相加。$n$ 次多项式


$$
y=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
$$

的导函数是


$$
y'=na_nx^{n-1}+(n-1)a_{n-1}x^{n-2}+\cdots+a_1,
$$

比原来低一次。

**例 9** 求 $y=\mathrm e^x(x^2+3x-1)\arcsin x$ 的导函数。

**解** 三个因子，逐项求导：


$$
\begin{aligned}
y'={}&(\mathrm e^x)'(x^2+3x-1)\arcsin x+\mathrm e^x(x^2+3x-1)'\arcsin x+\mathrm e^x(x^2+3x-1)(\arcsin x)'\\
={}&\mathrm e^x(x^2+3x-1)\arcsin x+\mathrm e^x(2x+3)\arcsin x+\mathrm e^x\frac{x^2+3x-1}{\sqrt{1-x^2}}\\
={}&\mathrm e^x\left[(x^2+5x+2)\arcsin x+\frac{x^2+3x-1}{\sqrt{1-x^2}}\right].
\end{aligned}

$$

合并时注意前两项的系数相加：$(x^2+3x-1)+(2x+3)=x^2+5x+2$。

## 复合函数求导：链式法则

**定理 5（链式法则）** 设 $u=g(x)$ 在 $x_0$ 可导，$y=f(u)$ 在 $u_0=g(x_0)$ 可导，则 $y=f(g(x))$ 在 $x_0$ 可导，且


$$
\left.[f(g(x))]'\right|_{x=x_0}=f'(u_0)g'(x_0)=f'(g(x_0))g'(x_0).
$$

**证明（第一种写法，有缺陷）** 直接把差商拆开：


$$
\frac{f(g(x_0+\Delta x))-f(g(x_0))}{\Delta x}=\frac{f(g(x_0+\Delta x))-f(g(x_0))}{g(x_0+\Delta x)-g(x_0)}\cdot\frac{g(x_0+\Delta x)-g(x_0)}{\Delta x}.
$$

> **理解关键**：问题在于第一个分母可能为零：$g$ 在 $x_0$ 附近可能取常值，或者 $g(x_0+\Delta x)=g(x_0)$ 对某些 $\Delta x$ 成立，此时这个式子没有意义。所以这个写法不能作为证明。

**证明（第二种写法）** 由 $f'(u_0)$ 存在，可写


$$
f(u_0+\Delta u)-f(u_0)=\left(f'(u_0)+o(1)\right)\Delta u\qquad(\Delta u\to0),
$$

其中 $o(1)$ 是随 $\Delta u\to0$ 而趋于零的量；当 $\Delta u=0$ 时等式两边都是 $0$，规定 $o(1)$ 取任意值即可，等式仍成立。同理


$$
g(x_0+\Delta x)-g(x_0)=\left(g'(x_0)+o(1)\right)\Delta x\qquad(\Delta x\to0).
$$

由 $g$ 在 $x_0$ 连续，$\Delta x\to0$ 时 $\Delta u=g(x_0+\Delta x)-g(x_0)\to0$。于是


$$
\begin{aligned}
f(g(x_0+\Delta x))-f(g(x_0))
&=\left(f'(u_0)+o(1)\right)\Delta u\\
&=\left(f'(u_0)+o(1)\right)\left(g'(x_0)+o(1)\right)\Delta x\\
&=\left(f'(u_0)g'(x_0)+o(1)\right)\Delta x .
\end{aligned}

$$

两边除以 $\Delta x$ 并令 $\Delta x\to0$，得


$$
[f(g(x_0))]'=f'(u_0)g'(x_0).
$$

第二种写法把"除以 $\Delta u$"换成了"乘上 $\Delta u$ 的线性表示"，避开了 $\Delta u=0$ 的问题。

链式法则可以逐层使用。三层复合


$$
[f(g(h(x)))]'=f'(g(h(x)))\cdot g'(h(x))\cdot h'(x).
$$

熟练之后中间变量可以不写出来，心里默记"外层导数乘内层导数"即可，例如


$$
\left(\sqrt{1+x^2}\right)'=\frac{1}{2\sqrt{1+x^2}}\cdot 2x=\frac{x}{\sqrt{1+x^2}}.
$$

**例 10** 用链式法则求 $y=x^\alpha\ (x>0)$ 的导函数。

**解** 由对数恒等式 $x^\alpha=\mathrm e^{\alpha\ln x}$，令 $y=\mathrm e^u$，$u=\alpha\ln x$，则


$$
(x^\alpha)'=\mathrm e^u\cdot\frac{\alpha}{x}=\mathrm e^{\alpha\ln x}\cdot\frac{\alpha}{x}=x^\alpha\cdot\frac{\alpha}{x}=\alpha x^{\alpha-1}.
$$

同一个结果，用定义算是"凑 $(1+u)^\alpha$"，用链式法则是"把幂变成指数"，后者在求导时更省力。类似地，$y=\mathrm e^{-x}$ 令 $u=-x$，得 $(\mathrm e^{-x})'=\mathrm e^u\cdot(-1)=-\mathrm e^{-x}$。

**例 11** 求 $y=\mathrm e^{\sqrt{1+\cos x}}$ 的导函数。

**解** 三层复合：$y=\mathrm e^u$，$u=\sqrt v$，$v=1+\cos x$。


$$
\begin{aligned}
y'&=\mathrm e^u\cdot\frac{1}{2\sqrt v}\cdot(-\sin x)\\
&=-\frac{\mathrm e^{\sqrt{1+\cos x}}\sin x}{2\sqrt{1+\cos x}}.
\end{aligned}

$$

## 幂指函数与对数求导法

形如


$$
f(x)=u(x)^{v(x)}
$$

的函数称为**幂指函数**：底数与指数都随 $x$ 变化，既不是幂函数也不是指数函数，不能直接套 $(x^\alpha)'$ 或 $(a^x)'$。处理办法是两边取对数，把指数上的 $v(x)$ 降下来：


$$
\ln f(x)=v(x)\ln u(x).
$$

两边对 $x$ 求导，左边是 $\dfrac{f'(x)}{f(x)}$：


$$
\frac{f'(x)}{f(x)}=v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)},
$$

故


$$
f'(x)=u(x)^{v(x)}\left[v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right].
$$

> **理解关键**：这就是**对数求导法**。它对多因子连乘、连除的式子同样有效：取对数把乘除变成加减，求导后不易漏项。

**例 12** 求 $y=(\sin x)^{\cos x}$ 的导函数。

**解** 两边取对数（要求 $\sin x>0$）：


$$
\ln y=\cos x\ln\sin x.
$$

两边求导：


$$
\frac{y'}y=-\sin x\ln\sin x+\cos x\cdot\frac{\cos x}{\sin x},
$$

故


$$
y'=(\sin x)^{\cos x}\left[\frac{\cos^2x}{\sin x}-\sin x\ln\sin x\right].
$$

**例 13** 求 $y=x\sqrt{\dfrac{1-x}{1+x}}$ 的导数。

**解** 取对数，把根号与商都拆开：


$$
\ln y=\ln x+\frac12\ln(1-x)-\frac12\ln(1+x).
$$

两边求导：


$$
\frac{y'}y=\frac1x-\frac{1}{2(1-x)}-\frac{1}{2(1+x)}=\frac1x-\frac{1}{1-x^2}=\frac{1-x-x^2}{x(1-x^2)}.
$$

于是


$$
y'=x\sqrt{\frac{1-x}{1+x}}\cdot\frac{1-x-x^2}{x(1-x^2)}=\sqrt{\frac{1-x}{1+x}}\cdot\frac{1-x-x^2}{1-x^2}.
$$

如果直接对 $x\sqrt{(1-x)/(1+x)}$ 用乘积与商法则，根号内外要反复用链式法则，计算量明显更大。取对数之后，$\ln x$、$\ln(1-x)$、$\ln(1+x)$ 三项各自求导，一步到位。

## 课堂小结

这一讲的主线是：导数定义为差商的极限，几何上是切线斜率，物理上是瞬时变化率；由定义算出基本初等函数的导数；再用线性、乘积、倒数、反函数、复合五条法则，把求导化归为查表加链式法则；最后用对数求导法处理幂指函数和多因子乘除。

容易出错的地方有五处。

第一，分段函数在分界点要先验连续、再验左右导数相等，两个条件缺一不可。

第二，$f'_-(x_0)$ 是左导数，$f'(x_0-)$ 是导函数的左极限，两者可以不同时存在。

第三，可导必连续，连续不一定可导；$|x|$ 在 $0$ 处是尖角，$x^{2/3}$ 在 $0$ 处切线竖直，都是连续但不可导。

第四，链式法则要逐层乘到底，$\left(\mathrm e^{\sqrt{1+\cos x}}\right)'$ 有三层，漏一层就错；而 $(uv)'=u'v+uv'$ 不能写成 $u'v'$。

第五，反函数求导公式 $\left(f^{-1}\right)'(y)=1/f'(x)$ 中，分母的导数在 $x$ 处取值，结果再用 $y=f(x)$ 换回 $y$ 表示。
