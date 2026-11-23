---
slug: "03-function-properties-and-elementary-functions"
title: "函数的几种特性与初等函数"
summary: "第 3 讲：函数的几种特性与初等函数。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "03"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "3函数的几种特性与初等函数.pdf"
    url: "https://drive.google.com/file/d/14EV5RwFCV-1YDK7a4R2gvOcqvNol67ls/view?usp=drivesdk"
---

有了函数的概念，下一步要描述函数的整体行为：它是否被限制在一条水平带内，是否随自变量增大而增大，图形是否有对称性，是否周而复始。这些性质分别是有界性、单调性、奇偶性和周期性。最后把最基本的几类函数列出来，并说明初等函数是怎样由它们生成的。

## 有界性

设函数 $f(x)$ 在区间 $I$ 上有定义。

- 若存在常数 $M\in\mathbb R$，使得对一切 $x\in I$，都有 $f(x)\le M$，则称 $f(x)$ 在 $I$ 上**有上界**，$M$ 是一个上界；
- 若存在常数 $m\in\mathbb R$，使得对一切 $x\in I$，都有 $f(x)\ge m$，则称 $f(x)$ 在 $I$ 上**有下界**，$m$ 是一个下界；
- 若 $f$ 在 $I$ 上既有上界又有下界，则称 $f$ 是 $I$ 上的**有界函数**；否则称为**无界函数**。

$f$ 在 $I$ 上有界，等价于存在常数 $K>0$，使得

$$
|f(x)|\le K,\qquad \forall x\in I.
$$

$f$ 在 $I$ 上无界，则等价于：对任意 $K>0$，都存在 $x_0\in I$，使得

$$
|f(x_0)|>K.
$$

注意有界性依赖于区间。例如 $\sin x$ 在 $[-\pi,\pi]$ 上有界；$\frac1x$ 在 $(0,4)$ 上无界，但在 $[1,+\infty)$ 上有界。

> **易错点**：说“这个函数有界”而不指明区间，通常是不完整的。

六个常见的有界函数：

$$
|\sin x|\le1,\qquad |\cos x|\le1,\qquad x\in(-\infty,+\infty);
$$

$$
|\arcsin x|\le\frac\pi2,\qquad |\arccos x|\le\pi,\qquad x\in[-1,1];
$$

$$
|\arctan x|<\frac\pi2,\qquad |\operatorname{arccot}x|<\pi,\qquad x\in(-\infty,+\infty).
$$

其中 $\arcsin x\in[-\frac\pi2,\frac\pi2]$，$\arccos x\in[0,\pi]$，$\arctan x\in(-\frac\pi2,\frac\pi2)$，$\operatorname{arccot}x\in(0,\pi)$。这些取值范围本身就是有界性的具体体现。

## 单调性

设函数 $f(x)$ 在区间 $I$ 上有定义。如果对任意 $x_1,x_2\in I$，当 $x_1<x_2$ 时：

- 有 $f(x_1)<f(x_2)$，则称 $f(x)$ 在 $I$ 上**严格单调递增**；
- 有 $f(x_1)>f(x_2)$，则称 $f(x)$ 在 $I$ 上**严格单调递减**；
- 有 $f(x_1)\le f(x_2)$，则称 $f(x)$ 在 $I$ 上**单调递增**；
- 有 $f(x_1)\ge f(x_2)$，则称 $f(x)$ 在 $I$ 上**单调递减**。

严格单调递增和严格单调递减函数统称**严格单调函数**；单调递增和单调递减函数统称**单调函数**。区别在于是否允许函数值相等。

例如 $y=x^3$ 在 $\mathbb R$ 上严格单调递增。因为对 $x_1<x_2$，

$$
x_2^3-x_1^3=(x_2-x_1)(x_2^2+x_1x_2+x_1^2)>0,
$$

其中二次因子恒正，所以 $x_1^3<x_2^3$。

再如取整函数 $y=[x]$，其中 $[x]$ 表示不超过 $x$ 的最大整数。它的图像是一条阶梯：在区间 $[k,k+1)$ 上，$[x]=k$。因此 $[x]$ 在 $\mathbb R$ 上单调递增，但不是严格单调递增；在每个整数点处发生跳跃。

![符号函数与取整函数](/images/campus-mathematical-analysis/lec03-sign-floor.svg)

单调性也是相对于区间而言的。一个函数可能在某个区间上单调递增，在另一个区间上单调递减；讨论单调性时必须先明确区间。

## 奇偶性

设函数 $f(x)$ 在区间 $I$ 上有定义，且 $I$ 关于原点对称，即

$$
x\in I\Longleftrightarrow -x\in I.
$$

- 如果对一切 $x\in I$，都有 $f(x)=f(-x)$，则称 $f(x)$ 是**偶函数**；
- 如果对一切 $x\in I$，都有 $f(x)=-f(-x)$，则称 $f(x)$ 是**奇函数**。

偶函数的图形关于 $y$ 轴对称，奇函数的图形关于原点对称。

> **关键结论**：判断奇偶性，第一步是看定义域是否关于原点对称；如果定义域不对称，函数既不是奇函数也不是偶函数。

> **补充说明**：若奇函数在 $x=0$ 处有定义，则必有 $f(0)=0$——在 $f(x)=-f(-x)$ 中取 $x=0$ 即得。偶函数没有这条限制。所以题目给出“奇函数且在 $0$ 有定义”时，可以直接写出 $f(0)=0$。

例如：

**（1）** $y=\ln(x+\sqrt{x^2+1})$。

因为

$$
\sqrt{x^2+1}>|x|,
$$

所以 $x+\sqrt{x^2+1}>0$，定义域为 $\mathbb R$。并且

$$
\begin{aligned}
y(-x)
&=\ln\left(-x+\sqrt{x^2+1}\right)\\
&=\ln\left(\sqrt{x^2+1}-x\right)\\
&=\ln\frac{1}{\sqrt{x^2+1}+x}\\
&=-\ln\left(x+\sqrt{x^2+1}\right)
=-y(x),
\end{aligned}
$$

所以它是奇函数。

**（2）** $y=F(x)\left(\dfrac1{a^x-1}+\dfrac12\right)$，其中 $a>0$，$a\ne1$，$F(x)$ 为奇函数。

先看因子

$$
h(x)=\frac1{a^x-1}+\frac12.
$$

它的定义域是 $x\ne0$，关于原点对称。并且

$$
h(-x)=\frac1{a^{-x}-1}+\frac12
=\frac{a^x}{1-a^x}+\frac12,
$$

于是

$$
h(x)+h(-x)
=\frac1{a^x-1}+\frac{a^x}{1-a^x}+1
=-1+1=0.
$$

所以 $h$ 是奇函数。两个奇函数的乘积是偶函数：

$$
y(-x)=F(-x)h(-x)=(-F(x))(-h(x))=F(x)h(x)=y(x).
$$

因此这个函数是偶函数。

**（3）** 定义在对称区间上的任意函数 $f(x)$，总可以表示为一个奇函数与一个偶函数之和：

$$
f(x)=\frac{f(x)+f(-x)}{2}+\frac{f(x)-f(-x)}{2}.
$$

右边第一项满足

$$
\frac{f(-x)+f(x)}{2}=\frac{f(x)+f(-x)}{2},
$$

是偶函数；第二项满足

$$
\frac{f(-x)-f(x)}{2}=-\frac{f(x)-f(-x)}{2},
$$

是奇函数。并且这种分解是唯一的：若 $f=e+o$，其中 $e$ 为偶函数、$o$ 为奇函数，则 $f(-x)=e(x)-o(x)$，与 $f(x)=e(x)+o(x)$ 联立即可解出

$$
e(x)=\frac{f(x)+f(-x)}{2},\qquad
o(x)=\frac{f(x)-f(-x)}{2}.
$$

## 周期性

设函数 $f(x)$ 在 $(-\infty,+\infty)$ 上有定义。若存在 $T>0$，使得对一切 $x\in(-\infty,+\infty)$，都有

$$
f(x+T)=f(x),
$$

则称 $f(x)$ 是**周期函数**，$T$ 为 $f(x)$ 的一个**周期**。通常说的“周期”是指最小正周期（如果存在）。

> **补充说明**：定义写“在 $(-\infty,+\infty)$ 上有定义”，是为了让 $x$ 与 $x+T$ 同时落在定义域内。更一般地，只要求定义域 $D$ 对平移 $T$ 封闭：$x\in D\iff x+T\in D$。$\tan x$ 的定义域虽不连通，但对 $T=\pi$ 满足这一点；而有界区间如 $(0,1)$ 容不下任何周期——这就是“定义域必须双向无界”的具体含义。另外，$T$ 是周期时 $2T,3T,\dots$ 也都是周期，所以周期一般不唯一，“最小正周期”才要单独讨论。

例如 $\sin x$ 是周期为 $2\pi$ 的函数：

$$
\sin(x+2\pi)=\sin x.
$$

$\tan x$ 的定义域是除去 $x=\frac\pi2+k\pi$（$k\in\mathbb Z$）的数轴，它是以 $\pi$ 为周期的周期函数：

$$
\tan(x+\pi)=\tan x.
$$

![周期函数](/images/campus-mathematical-analysis/lec03-periodic.svg)

狄利克雷函数

$$
D(x)=
\begin{cases}
1,&x\in\mathbb Q,\\
0,&x\notin\mathbb Q
\end{cases}
$$

是周期函数。任何正有理数 $r$ 都是它的周期：$x+r$ 是有理数当且仅当 $x$ 是有理数，所以 $D(x+r)=D(x)$。但正有理数中没有最小的，因此狄利克雷函数没有最小正周期。

> **关键结论**：这说明“周期函数”不一定有最小正周期。

> **补充说明**：周期函数之和不一定还是周期函数。例如 $f(x)=\sin x+\sin(\sqrt2\,x)$。若 $T>0$ 是它的周期，则
>
> $$
> \sin(x+T)-\sin x=-[\sin(\sqrt2(x+T))-\sin(\sqrt2\,x)]
> $$
>
> 对一切 $x$ 成立。左边若不恒为零，按和差化积公式可知它的最小正周期为 $2\pi$，右边若不恒为零则为 $\frac{2\pi}{\sqrt2}$。两边若相等，最小正周期就应相同，即 $2\pi=\frac{2\pi}{\sqrt2}$，不可能；若某一边恒为零，另一边也须恒为零，于是 $T=2m\pi$ 且 $\sqrt2\,T=2n\pi$，推出 $\sqrt2=\frac nm$ 为有理数，同样矛盾。所以这个和没有周期。

再如 $y=x-[x]$，即 $x$ 的小数部分。对任意实数 $x$，

$$
(x+1)-[x+1]=x+1-([x]+1)=x-[x],
$$

所以 $1$ 是它的周期。若 $0<T<1$ 也是周期，取 $x=0$，则

$$
f(T)=f(0)=0.
$$

但当 $0<T<1$ 时，$[T]=0$，所以 $f(T)=T\ne0$，矛盾。因此最小正周期是 $1$。

## 基本初等函数

以下六类函数称为**基本初等函数**。

### 常数函数

$$
y=C,\qquad -\infty<x<+\infty.
$$

它的值域是单点集 $\{C\}$。

### 幂函数

$$
y=x^\alpha,\qquad 0<x<+\infty,\quad \alpha\ne0.
$$

当 $\alpha>0$ 时，$x^\alpha$ 在 $(0,+\infty)$ 上严格递增；当 $\alpha<0$ 时，$x^\alpha$ 在 $(0,+\infty)$ 上严格递减。函数 $y=x^\alpha$ 与 $y=x^{1/\alpha}$ 互为反函数。

在 $(0,+\infty)$ 上讨论幂函数，是为了避免定义域随指数 $\alpha$ 的形式而变化；具体问题中，若 $\alpha$ 是整数或特殊的有理数，定义域可以相应扩大。

### 指数函数

$$
y=a^x,\qquad a>0,\quad a\ne1,\quad -\infty<x<+\infty.
$$

当 $a>1$ 时，$a^x$ 在 $\mathbb R$ 上严格递增；当 $0<a<1$ 时，$a^x$ 在 $\mathbb R$ 上严格递减。值域为 $(0,+\infty)$。

### 对数函数

$$
y=\log_a x,\qquad a>0,\quad a\ne1,\quad 0<x<+\infty.
$$

当 $a>1$ 时，$\log_a x$ 在 $(0,+\infty)$ 上严格递增；当 $0<a<1$ 时，$\log_a x$ 在 $(0,+\infty)$ 上严格递减。值域为 $\mathbb R$。指数函数 $y=a^x$ 与对数函数 $y=\log_a x$ 互为反函数。

### 三角函数

正弦函数 $y=\sin x$ 和余弦函数 $y=\cos x$ 的定义域都是 $(-\infty,+\infty)$，值域都是 $[-1,1]$，周期都是 $2\pi$。

正切函数

$$
y=\tan x,\qquad x\ne k\pi+\frac\pi2,\quad k\in\mathbb Z,
$$

值域为 $\mathbb R$，周期为 $\pi$。余切函数

$$
y=\cot x,\qquad x\ne k\pi,\quad k\in\mathbb Z,
$$

值域为 $\mathbb R$，周期为 $\pi$。

### 反三角函数

反正弦函数

$$
y=\arcsin x,\qquad -1\le x\le1,\quad -\frac\pi2\le y\le\frac\pi2.
$$

反余弦函数

$$
y=\arccos x,\qquad -1\le x\le1,\quad 0\le y\le\pi.
$$

反正切函数

$$
y=\arctan x,\qquad -\infty<x<+\infty,\quad -\frac\pi2<y<\frac\pi2.
$$

反余切函数

$$
y=\operatorname{arccot}x,\qquad -\infty<x<+\infty,\quad 0<y<\pi.
$$

> **易错点**：反三角函数的值域是规定好的，不能随意取别的分支。例如 $\arcsin\frac12=\frac\pi6$，而不是 $\frac{5\pi}6$。

## 初等函数

由基本初等函数经过有限次四则运算与复合运算所产生的函数，称为**初等函数**。

例如

$$
y=ax^2+bx+c,
$$

$$
y=\frac{\log_a(1+x)}{x^2+1},
$$

$$
y=\sin\frac1x+\cos^2x,
$$

$$
y=e^{-x^2}+\arctan\frac1x
$$

都是初等函数。实际问题中也有许多函数不是初等函数，例如狄利克雷函数。

> **补充说明**：初等函数的定义域要逐步交出来：分母不为零、对数的真数为正、偶次根号下非负、$\arcsin$ 与 $\arccos$ 的自变量在 $[-1,1]$ 内。第 7 讲会证明初等函数在其定义域内连续，因此求极限时可以直接代入——前提是代入点确实属于定义域。

## 双曲函数与反双曲函数

双曲正弦、双曲余弦、双曲正切分别定义为

$$
\sinh x=\frac{e^x-e^{-x}}2,
$$

$$
\cosh x=\frac{e^x+e^{-x}}2,
$$

$$
\tanh x=\frac{\sinh x}{\cosh x}
=\frac{e^x-e^{-x}}{e^x+e^{-x}}.
$$

它们与三角函数有平行的恒等式，最基本的是

$$
\cosh^2x-\sinh^2x=1.
$$

由定义直接计算即可验证。$\sinh x$ 是奇函数，$\cosh x$ 是偶函数，$\tanh x$ 是奇函数，且 $|\tanh x|<1$。

反双曲函数可以用对数表示：

$$
\operatorname{arsinh}x=\ln\left(x+\sqrt{x^2+1}\right),
\qquad -\infty<x<+\infty;
$$

$$
\operatorname{arcosh}x=\ln\left(x+\sqrt{x^2-1}\right),
\qquad x\ge1;
$$

$$
\operatorname{artanh}x=\frac12\ln\frac{1+x}{1-x},
\qquad -1<x<1.
$$

这些公式在积分中经常出现，后面学到不定积分时会再次用到。

## 课堂练习

**练习 1** 证明：对任意 $a,b\in\mathbb R$，

$$
\frac{|a+b|}{1+|a+b|}
\le\frac{|a|}{1+|a|}+\frac{|b|}{1+|b|}.
$$

令

$$
f(t)=\frac{t}{1+t}=1-\frac1{1+t},\qquad t\ge0.
$$

$f$ 在 $[0,+\infty)$ 上严格单调递增。由三角不等式 $|a+b|\le|a|+|b|$，得

$$
f(|a+b|)\le f(|a|+|b|),
$$

即

$$
\frac{|a+b|}{1+|a+b|}
\le\frac{|a|+|b|}{1+|a|+|b|}.
$$

又因为

$$
\frac{|a|+|b|}{1+|a|+|b|}
=\frac{|a|}{1+|a|+|b|}+\frac{|b|}{1+|a|+|b|}
\le\frac{|a|}{1+|a|}+\frac{|b|}{1+|b|},
$$

所以原不等式成立。

**练习 2** 设

$$
A+B=\{z:z=x+y,\ x\in A,\ y\in B\}.
$$

证明：当 $A,B$ 非空且有下界时，

$$
\inf(A+B)=\inf A+\inf B.
$$

设 $\alpha=\inf A$，$\beta=\inf B$。对任意 $x\in A$、$y\in B$，有 $x\ge\alpha$、$y\ge\beta$，所以

$$
x+y\ge\alpha+\beta.
$$

因此 $\alpha+\beta$ 是 $A+B$ 的一个下界。

再证它是最大下界。对任意 $\varepsilon>0$，由下确界的定义，存在 $x_0\in A$，使得

$$
x_0<\alpha+\frac\varepsilon2;
$$

存在 $y_0\in B$，使得

$$
y_0<\beta+\frac\varepsilon2.
$$

于是

$$
x_0+y_0<\alpha+\beta+\varepsilon.
$$

这说明任何大于 $\alpha+\beta$ 的数都不是 $A+B$ 的下界。因此

$$
\inf(A+B)=\alpha+\beta=\inf A+\inf B.
$$

**练习 3** 是否只有严格单调函数才存在反函数？

不是。函数存在反函数的充要条件是它在定义域上单射；严格单调只是充分条件，不是必要条件。

例如

$$
f(x)=\frac1x,\qquad x\in(-\infty,0)\cup(0,+\infty).
$$

它是一对一的：若 $\frac1{x_1}=\frac1{x_2}$，则 $x_1=x_2$，所以它有反函数，反函数就是它自己。但它在整个定义域上不是单调的：在 $(-\infty,0)$ 上递减，在 $(0,+\infty)$ 上递减，可是取 $x_1<0<x_2$ 时，$f(x_1)<0<f(x_2)$，这又不符合“递减”的整体要求。因此，单射比严格单调更一般。

**练习 4** 求

$$
f(x)=(x^2+1)\operatorname{sgn}x
$$

的反函数。

分段讨论：

当 $x>0$ 时，$y=x^2+1>1$，所以 $x=\sqrt{y-1}$；

当 $x=0$ 时，$y=0$；

当 $x<0$ 时，$y=-(x^2+1)<-1$，所以

$$
x=-\sqrt{-y-1}.
$$

因此反函数为

$$
f^{-1}(y)=
\begin{cases}
\sqrt{y-1},&y>1,\\
0,&y=0,\\
-\sqrt{-y-1},&y<-1.
\end{cases}
$$

其定义域，即原函数的值域，为

$$
(-\infty,-1)\cup\{0\}\cup(1,+\infty).
$$

按习惯把自变量改记为 $x$，就得到 $y=f^{-1}(x)$ 的表达式。

## 课堂小结

这一讲的主线是“从函数到函数的整体性质”：有界性看函数值是否被两条水平线夹住，单调性看函数值随自变量如何变化，奇偶性看图形是否关于 $y$ 轴或原点对称，周期性看图形是否重复。四类性质都必须先明确区间或定义域；离开定义域谈性质没有意义。

基本初等函数是后面所有初等函数的积木。要记住它们的定义域、值域、单调区间和图像特征，特别是反三角函数的值域限制。常见错误有：把“单调”与“严格单调”混为一谈；忽略奇偶性对定义域对称的要求；认为周期函数一定有最小正周期；把 $\arcsin$ 的值域取错；讨论有界性时不说明区间。
