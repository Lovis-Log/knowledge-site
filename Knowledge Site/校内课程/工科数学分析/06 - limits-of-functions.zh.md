---
slug: "06-limits-of-functions"
title: "函数极限"
summary: "第 6 讲：函数极限。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "06"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "6函数极限.pdf"
    url: "https://drive.google.com/file/d/1xJXvGSsiikyRMeEFEu1_PahjOdFks_gR/view?usp=drivesdk"
---

数列极限只研究"$n\to\infty$"这一种过程。函数极限要研究的是自变量趋近某个点的过程：$x\to x_0$、$x\to x_0^+$、$x\to x_0^-$、$x\to\infty$、$x\to+\infty$、$x\to-\infty$，再加上函数值本身趋于 $A$、$\infty$、$+\infty$、$-\infty$ 的四种情况。所以定义的写法会变，但"先给精度、再找门限"的结构完全不变。

## 从瞬时速度说起

$0$ 时刻物体开始自由落体，$t_0=0$ 时物体静止、下落距离为零；$t>0$ 时测得下落距离 $h(t)$。要问 $t_1$ 时刻的瞬时速度 $v(t_1)$，可这个量本身不易观测。

观测数据表明 $h$ 与 $t^2$ 成正比，即

$$h(t)=k\,t^2=\frac12 g\,t^2 .$$

数学上瞬时速度不能直接测量，只能由平均速度取极限来定义。取时间段 $[t_1,t]$（或 $[t,t_1]$），平均速度

$$v_{[t_1,t]}=\frac{\frac12gt^2-\frac12gt_1^2}{t-t_1}=\frac12g\,(t+t_1)\longrightarrow gt_1\qquad(t\to t_1).$$

于是定义

$$v(t_1)=\lim_{t\to t_1}\frac{h(t)-h(t_1)}{t-t_1}=gt_1 .$$

注意这里 $t\ne t_1$：时间段长度趋于零，但从不等于零，否则分母为零。这正是函数极限要在**去心邻域**上讨论的原因。

## 函数极限的定义

**定义** 设函数 $y=f(x)$ 在点 $x_0$ 的某个去心邻域内有定义，即存在 $\rho>0$ 使 $O(x_0,\rho)\setminus\{x_0\}\subset D_f$。设 $A$ 为实数，如果对任意 $\varepsilon>0$，都可以找到 $\delta>0$，使得当

$$0<|x-x_0|<\delta$$

时成立

$$|f(x)-A|<\varepsilon,$$

则称 $A$ 是 $f(x)$ 在点 $x_0$ 的极限，记为

$$\lim_{x\to x_0}f(x)=A,\qquad\text{或}\qquad f(x)\to A\ (x\to x_0).$$

如果不存在具有上述性质的实数 $A$，则称 $f(x)$ 在点 $x_0$ 的极限不存在。

把两个定义对照着看，区别只有两处。

> **易混点**：第一，数列极限里 $n\to\infty$，数列在"$n=\infty$"处本来就没有定义，所以不必去心；函数极限在 $x_0$ 处可能是有定义的，但**极限与 $f(x_0)$ 无关**，所以必须去掉 $x_0$ 这一点。
>
> 第二，$n\to\infty$ 有时可以省略不写（默认就是 $n\to\infty$），而 $f(x)\to A$ 中的"$x\to x_0$"绝不能省，否则不知道是哪个过程。

## 定义的六点说明

**一、远处的情形无关。** 对 $0<\delta_0<\rho$，改变 $f(x)$ 在 $|x-x_0|>\delta_0$ 处的定义，不影响极限的存在性与取值。和数列"有限项无关"是同一个道理。

**二、"任意"指的是任意小。** $\forall\varepsilon>0$ 强调的是 $\varepsilon$ 能任意接近 $0$，而不是任意大。所以定义可以改写成 $\forall\varepsilon\in(0,\frac12)$ 或 $\forall\varepsilon\in(0,\delta_0)$。

**三、先有 $\varepsilon$，后有 $\delta$。** $\varepsilon$ 定了才谈得上找 $\delta$，一般 $\varepsilon$ 越小 $\delta$ 也越小；如果某个 $\delta$ 满足要求，比它小的也都满足。所以不追求 $\delta$ 的精确值（最大的 $\delta$），只追求它存在，同时追求可解与简洁——放缩可以大胆。

**四、右端可换成 $2\varepsilon$、$M\varepsilon$。** 因为"$\varepsilon$ 取遍所有正数"与"$M\varepsilon$ 取遍所有正数"等价。

**五、邻域的说法。** 一旦 $x\in O(x_0,\delta)\setminus\{x_0\}$，就有 $f(x)\in O(A,\varepsilon)$。这句话把定义翻译成了"自变量的邻域被映射进函数值的邻域"。

**六、极限与函数值无关。** $\lim\limits_{x\to x_0}f(x)$ 与 $f(x_0)$ 没有关系：$f(x_0)$ 取什么值都不影响极限的存在性与极限值；极限存在时两者也未必相等，很多情形下 $f(x_0)$ 根本没有定义。

**例 1** 证明 $\lim\limits_{x\to0}e^x=1$。

**证明** 按定义，任给 $\varepsilon>0$（不妨设 $0<\varepsilon<1$），要找 $\delta>0$，使 $0<|x|<\delta$ 时 $|e^x-1|<\varepsilon$。

不等式 $|e^x-1|<\varepsilon$ 等价于

$$1-\varepsilon<e^x<1+\varepsilon\iff \ln(1-\varepsilon)<x<\ln(1+\varepsilon).$$

于是取

$$\delta=\min\{\ln(1+\varepsilon),\,-\ln(1-\varepsilon)\}>0,$$

当 $0<|x|<\delta$ 时上式成立，即 $|e^x-1|<\varepsilon$。故 $\lim\limits_{x\to0}e^x=1$。

这里没有用放缩，而是直接把不等式解出来，得到"最精确的 $\delta$"。能这样做的场合不多，但它说明 $\delta$ 的取法本质上是解不等式。

**例 2** 设 $s(t)=t^3$，证明 $\lim\limits_{t\to1}\dfrac{s(t)-s(1)}{t-1}=3$。

**证明** 任给 $\varepsilon>0$，要找 $\delta>0$，使 $0<|t-1|<\delta$ 时

$$\left|\frac{t^3-1}{t-1}-3\right|<\varepsilon .$$

左端化简：

$$\left|\frac{t^3-1}{t-1}-3\right|=|t^2+t+1-3|=|t^2+t-2|=|t+2|\,|t-1| .$$

先加上条件 $|t-1|<1$，此时 $0<t<2$，故 $|t+2|<4$。于是

$$\left|\frac{t^3-1}{t-1}-3\right|<4|t-1| .$$

取 $\delta=\min\left\{1,\dfrac{\varepsilon}{4}\right\}$，当 $0<|t-1|<\delta$ 时上式 $<4\cdot\frac\varepsilon4=\varepsilon$，结论成立。

> **关键结论**：本例的手法要记牢：**先人为限制 $\delta\le1$，把可能无界的因子 $|t+2|$ 压成一个常数，再让剩下的 $|t-1|$ 去承担 $\varepsilon$**。如果不先限制 $\delta$，$|t+2|$ 在 $t\to1$ 附近虽然没有问题，但写不出显式的界。几乎所有"多项式型"的 $\varepsilon$-$\delta$ 证明都按这个顺序做。

## 函数极限的性质

**性质 1（唯一性）** 设 $A$ 与 $B$ 都是 $f(x)$ 在 $x_0$ 的极限，则 $A=B$。

**证明** 任给 $\varepsilon>0$，存在 $\delta_1,\delta_2>0$，使

$$0<|x-x_0|<\delta_1\Rightarrow|f(x)-A|<\frac\varepsilon2,\qquad 0<|x-x_0|<\delta_2\Rightarrow|f(x)-B|<\frac\varepsilon2 .$$

取 $\delta=\min\{\delta_1,\delta_2\}$，当 $0<|x-x_0|<\delta$ 时

$$|A-B|\le|f(x)-A|+|f(x)-B|<\varepsilon .$$

由于 $\varepsilon$ 可任意接近于 $0$，得 $A=B$。

注意最后一步与数列的情形不同：这里不能直接说"$\varepsilon$ 任意故 $|A-B|=0$"就完事，因为需要先确认**去心邻域里确实有 $x$** 可取。定义中已经假定 $f$ 在某个去心邻域有定义，所以这一点是有保证的。

**性质 2（局部保序性）** 若 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，且 $A>B$，则存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时 $f(x)>g(x)$。

**证明** 取 $\varepsilon_0=\frac{A-B}{2}>0$。由 $\lim f=A$，存在 $\delta_1>0$，使 $0<|x-x_0|<\delta_1$ 时 $|f(x)-A|<\varepsilon_0$，从而

$$f(x)>A-\varepsilon_0=\frac{A+B}{2};$$

由 $\lim g=B$，存在 $\delta_2>0$，使 $0<|x-x_0|<\delta_2$ 时 $|g(x)-B|<\varepsilon_0$，从而

$$g(x)<B+\varepsilon_0=\frac{A+B}{2}.$$

取 $\delta=\min\{\delta_1,\delta_2\}$，当 $0<|x-x_0|<\delta$ 时 $g(x)<\frac{A+B}{2}<f(x)$。

取 $\varepsilon_0=\frac{A-B}{2}$ 是把两个邻域"错开"的标准做法：各取一半间距，保证一个在上一个在下。

**推论 1** 若 $\lim\limits_{x\to x_0}f(x)=A\ne0$，则存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时 $|f(x)|>\dfrac{|A|}{2}$。

这条推论说明：极限非零，则函数在 $x_0$ 附近与零保持正距离。它是处理商式极限时"分母不会趋于零"的依据。

**推论 2** 若 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，且存在 $r>0$，使 $0<|x-x_0|<r$ 时 $g(x)\le f(x)$，则 $B\le A$。

**推论 3（局部有界性）** 若 $\lim\limits_{x\to x_0}f(x)=A$，则存在 $\delta>0$，使 $f(x)$ 在 $O(x_0,\delta)\setminus\{x_0\}$ 中有界。

注意"局部"二字：只能保证 $x_0$ 附近有界，在整个定义域内函数未必有界，$f(x)=\frac1x$ 在 $x=1$ 附近有界而在 $(0,1)$ 上无界。

**性质 2（夹逼性）** 若存在 $r>0$，使 $0<|x-x_0|<r$ 时

$$g(x)\le f(x)\le h(x),$$

且 $\lim\limits_{x\to x_0}g(x)=\lim\limits_{x\to x_0}h(x)=A$，则 $\lim\limits_{x\to x_0}f(x)=A$。

**证明** 任给 $\varepsilon>0$，存在 $\delta_1>0$，使 $0<|x-x_0|<\delta_1$ 时 $h(x)<A+\varepsilon$；存在 $\delta_2>0$，使 $0<|x-x_0|<\delta_2$ 时 $g(x)>A-\varepsilon$。取 $\delta=\min\{\delta_1,\delta_2,r\}$，当 $0<|x-x_0|<\delta$ 时

$$A-\varepsilon<g(x)\le f(x)\le h(x)<A+\varepsilon,$$

即 $|f(x)-A|<\varepsilon$。

## 一个重要函数极限

**例 3** 证明 $\lim\limits_{x\to0}\dfrac{\sin x}{x}=1$。

**证明** 先用面积不等式。对 $0<\theta<\frac\pi2$ 有

$$\sin\theta<\theta<\tan\theta .$$

由右边的不等式得

$$\cos x=\frac{\sin x}{\tan x}<\frac{\sin x}{x}<1,\qquad 0<x<\frac\pi2 .$$

$\cos x$ 与 $\frac{\sin x}{x}$ 都是偶函数，故上式对 $-\frac\pi2<x<0$ 也成立。

又

$$|\cos x-1|=2\sin^2\frac x2\le\frac{x^2}{2},$$

故 $\lim\limits_{x\to0}\cos x=1$。由夹逼性，

$$\lim_{x\to0}\frac{\sin x}{x}=1 .$$

> **关键结论**：这个极限是整门课的"发动机"：三角函数的导数、等价无穷小 $\sin x\sim x$、以及后面所有含三角函数的极限都从它推出来。而它唯一的入口就是 $\sin\theta<\theta<\tan\theta$ 这个由面积比较得到的不等式，所以那个不等式要随时能画出来：单位圆内接三角形面积 $\frac12\sin\theta$、扇形面积 $\frac12\theta$、外切直角三角形面积 $\frac12\tan\theta$，三者依次包含。

## 四则运算

**定理 1** 设 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，则

1. $\lim\limits_{x\to x_0}(\alpha f(x)+\beta g(x))=\alpha A+\beta B$（$\alpha,\beta$ 为常数）；
2. $\lim\limits_{x\to x_0}(f(x)g(x))=AB$；
3. $\lim\limits_{x\to x_0}\dfrac{f(x)}{g(x)}=\dfrac AB$（$B\ne0$）。

与数列情形的结论、证明完全平行。同样有一条放宽：**若 $\lim f(x)=0$ 而 $g(x)$ 在 $x_0$ 附近有界，则 $\lim f(x)g(x)=0$。** 例如

$$\lim_{x\to0}x\sin\frac1x=0,$$

因为 $|\sin\frac1x|\le1$，而 $x\to0$。这条结论之所以重要，是因为 $\sin\frac1x$ 在 $x\to0$ 时根本没有极限，四则运算法则原本用不上，但乘积的极限仍然存在。

**例 4** 对任意实数 $\alpha\ne0$，

$$\lim_{x\to0}\frac{\sin\alpha x}{x}=\lim_{x\to0}\alpha\cdot\frac{\sin\alpha x}{\alpha x}=\alpha .$$

对任意实数 $\alpha,\beta\ne0$，

$$\lim_{x\to0}\frac{\sin\alpha x}{\sin\beta x}=\lim_{x\to0}\frac{\sin\alpha x}{x}\Big/\frac{\sin\beta x}{x}=\frac{\alpha}{\beta} .$$

两式的做法一样：凑出 $\frac{\sin\square}{\square}$ 的形状，把系数提到极限外面。注意第二个等式把两个已知极限相除，这要求分母的极限 $\beta\ne0$，这正是条件。

## 函数极限与数列极限的关系

**定理 2（Heine 定理，归结原则）** $\lim\limits_{x\to x_0}f(x)=A$ 的充分必要条件是：对任意满足 $\lim\limits_{n\to\infty}x_n=x_0$ 且 $x_n\ne x_0\ (\forall n\ge1)$ 的数列 $\{x_n\}$，相应的函数值数列满足

$$\lim_{n\to\infty}f(x_n)=A .$$

这条定理把函数极限的问题翻译成数列极限的问题：想证明函数极限存在，只需对所有逼近 $x_0$ 的数列验证；想证明函数极限不存在，只需找出一个（或两个）捣乱的数列。它是双向的工具。

**必要性。** 由 $\lim\limits_{x\to x_0}f(x)=A$，任给 $\varepsilon>0$，存在 $\delta>0$，使 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\varepsilon$。因为 $x_n\to x_0$ 且 $x_n\ne x_0$，对这个 $\delta$ 存在 $N$，当 $n>N$ 时 $0<|x_n-x_0|<\delta$，于是 $|f(x_n)-A|<\varepsilon$。

**充分性（反证）。** 先写出否命题。"$f$ 在 $x_0$ 以 $A$ 为极限"是

$$\forall\varepsilon>0,\ \exists\delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ |f(x)-A|<\varepsilon,$$

它的否定是

$$\exists\varepsilon_0>0,\ \forall\delta>0,\ \exists x\ (0<|x-x_0|<\delta):\ |f(x)-A|\ge\varepsilon_0 .$$

也就是说，存在某个固定的正数 $\varepsilon_0$，不管 $\delta$ 取多小，总能在去心 $\delta$ 邻域里找到一点 $x$，使 $f(x)$ 与 $A$ 相差至少 $\varepsilon_0$。

现在取 $\delta_n=\frac1n$。对 $\delta_1=1$，存在 $x_1$ 满足 $0<|x_1-x_0|<1$ 且 $|f(x_1)-A|\ge\varepsilon_0$；对 $\delta_2=\frac12$，存在 $x_2$ 满足 $0<|x_2-x_0|<\frac12$ 且 $|f(x_2)-A|\ge\varepsilon_0$；……；对 $\delta_k=\frac1k$，存在 $x_k$ 满足 $0<|x_k-x_0|<\frac1k$ 且 $|f(x_k)-A|\ge\varepsilon_0$。

于是得到数列 $\{x_n\}$，满足 $x_n\ne x_0$、$\lim\limits_{n\to\infty}x_n=x_0$，但 $\{f(x_n)\}$ 不可能以 $A$ 为极限。这与题设矛盾，故假定不成立。

> **易错点**：否命题的写法值得单独练一遍。$\forall\varepsilon\exists\delta\forall x$ 的否定是 $\exists\varepsilon\forall\delta\exists x$，量词逐个翻转，"$<$"变成"$\ge$"。写错否命题是这类证明最常见的失分点。

**例 5** 证明 $\sin\dfrac1x$ 在 $x=0$ 没有极限。

**证明** 取

$$x_n^{(1)}=\frac{1}{n\pi},\qquad x_n^{(2)}=\frac{1}{2n\pi+\frac\pi2},\qquad n=1,2,3,\cdots$$

则 $x_n^{(1)}\ne0$、$x_n^{(2)}\ne0$，且都趋于 $0$。但

$$\sin\frac{1}{x_n^{(1)}}=\sin n\pi=0\to0,\qquad \sin\frac{1}{x_n^{(2)}}=\sin\left(2n\pi+\frac\pi2\right)=1\to1 .$$

两个数列对应的函数值极限不同，由 Heine 定理，$\sin\frac1x$ 在 $x=0$ 没有极限。

选的这两列很讲究：$x_n=\frac{1}{n\pi}$ 落在使 $\sin\frac1x=0$ 的点上，$x_n=\frac{1}{2n\pi+\pi/2}$ 落在使 $\sin\frac1x=1$ 的点上。凡是形如 $\sin\frac1x$、$\cos\frac1x$ 的振荡函数，都能用"取两列落在不同峰谷的点"来证明极限不存在。

**定理 2'（Heine 定理的改进版本）** $\lim\limits_{x\to x_0}f(x)$ 存在（不预先指定值）的充分必要条件是：对任意满足 $x_n\to x_0$ 且 $x_n\ne x_0$ 的数列，$\{f(x_n)\}$ 都收敛。

必要性显然。充分性只需说明：满足条件的不同数列 $\{x_n\}$、$\{y_n\}$ 对应的函数值数列极限相同。为此把两个数列交错排列：

$$x_1,\ y_1,\ x_2,\ y_2,\ x_3,\ y_3,\ \cdots$$

所得新数列仍满足 $x_n\to x_0$ 且各项不等于 $x_0$，故对应的函数值数列

$$f(x_1),\ f(y_1),\ f(x_2),\ f(y_2),\ f(x_3),\ f(y_3),\ \cdots$$

收敛。而收敛数列的子列必收敛于同一极限，所以 $\{f(x_n)\}$ 与 $\{f(y_n)\}$ 的极限相同。

改进版的意义在于它去掉了"预先知道极限是 $A$"这个要求：只要能保证所有数列对应的函数值都收敛，极限就存在。这在实际证明中比原版好用得多。

## 单侧极限

**定义** 设 $f(x)$ 在 $(x_0-\rho,x_0)$ 有定义（$\rho>0$）。若存在实数 $B$，对任意 $\varepsilon>0$ 存在 $\delta>0$，当 $-\delta<x-x_0<0$ 时 $|f(x)-B|<\varepsilon$，则称 $B$ 是 $f$ 在 $x_0$ 的**左极限**，记

$$\lim_{x\to x_0^-}f(x)=f(x_0-)=B .$$

设 $f(x)$ 在 $(x_0,x_0+\rho)$ 有定义。若存在实数 $C$，对任意 $\varepsilon>0$ 存在 $\delta>0$，当 $0<x-x_0<\delta$ 时 $|f(x)-C|<\varepsilon$，则称 $C$ 是 $f$ 在 $x_0$ 的**右极限**，记

$$\lim_{x\to x_0^+}f(x)=f(x_0+)=C .$$

**定理** 函数 $f(x)$ 在 $x_0$ 极限存在的充分必要条件是它在 $x_0$ 的左、右极限都存在且相等：

$$\lim_{x\to x_0}f(x)=A\iff \lim_{x\to x_0^-}f(x)=\lim_{x\to x_0^+}f(x)=A .$$

必要性是显然的（双侧极限推出单侧，取 $\delta$ 即可）。充分性要把左右两侧的 $\delta$ 取小：设左右极限都等于 $A$，则存在 $\delta_1,\delta_2$，左侧用 $\delta_1$、右侧用 $\delta_2$ 分别控制，取 $\delta=\min\{\delta_1,\delta_2\}$，于是 $0<|x-x_0|<\delta$ 时不管是左是右都有 $|f(x)-A|<\varepsilon$。

**例 5（分段函数）** 设

$$f(x)=\begin{cases}\dfrac{\sin 2x}{x}, & x<0,\\[6pt] 2\cos x^2, & x\ge0 .\end{cases}$$

问当 $x$ 趋于 $0$ 时 $f(x)$ 的极限是否存在？

**解** 分别求两侧：

$$\lim_{x\to0^-}f(x)=\lim_{x\to0^-}\frac{\sin 2x}{x}=2,\qquad \lim_{x\to0^+}f(x)=\lim_{x\to0^+}2\cos x^2=2 .$$

左右极限存在且相等，故当 $x\to0$ 时极限存在，且 $\lim\limits_{x\to0}f(x)=2$。

> **关键结论**：分段函数在分界点处的极限，永远先算左右两侧。左右不等则极限不存在（哪怕两侧都有限）；一侧不存在也立刻能判定整体不存在。

## 定义向六种过程、四种函数值推广

原来写的定义是

$$\lim_{x\to x_0}f(x)=A:\quad \forall\varepsilon>0,\ \exists\delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ |f(x)-A|<\varepsilon,$$

其中 $x_0,A\in\mathbb{R}$。把自变量的过程换成六种、函数值的去向换成四种，就得到 $4\times6=24$ 种函数极限定义，具体差别只在"门限"和"控制的量"：

**六种自变量的极限过程**：$x\to x_0$、$x\to x_0^+$、$x\to x_0^-$、$x\to\infty$、$x\to+\infty$、$x\to-\infty$，门限分别是

$$x\to x_0:\ \exists\delta>0,\ 0<|x-x_0|<\delta;\qquad x\to x_0^+:\ 0<x-x_0<\delta;\qquad x\to x_0^-:\ -\delta<x-x_0<0;$$

$$x\to\infty:\ \exists X>0,\ |x|>X;\qquad x\to+\infty:\ x>X;\qquad x\to-\infty:\ x<-X .$$

**四种函数值的极限情况**：$f(x)\to A$、$\infty$、$+\infty$、$-\infty$，控制的量分别是

$$|f(x)-A|<\varepsilon;\qquad |f(x)|>G;\qquad f(x)>G;\qquad f(x)<-G .$$

例如

$$\lim_{x\to x_0}f(x)=\infty:\quad \forall G>0,\ \exists\delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ |f(x)|>G;$$

$$\lim_{x\to+\infty}f(x)=A:\quad \forall\varepsilon>0,\ \exists X>0,\ \forall x\ (x>X):\ |f(x)-A|<\varepsilon;$$

$$\lim_{x\to-\infty}f(x)=+\infty:\quad \forall G>0,\ \exists X>0,\ \forall x\ (x<-X):\ f(x)>G .$$

二十四条定义不必逐条背，抓住两点就不会写错：**自变量那一侧决定用 $\delta$ 还是 $X$**，**函数值那一侧决定用 $\varepsilon$ 还是 $G$，以及是否加绝对值、是否带符号**。

**例 6** 证明 $\lim\limits_{x\to-\infty}e^x=0$。

**证明** 对任意 $\varepsilon\in(0,1)$，取 $X=-\ln\varepsilon>0$，当 $x<-X$ 时 $e^x<e^{-X}=\varepsilon$，又 $e^x>0$，故 $|e^x-0|<\varepsilon$。

**例 7** 证明 $\lim\limits_{x\to1^-}\dfrac{x^2}{x-1}=-\infty$。

**证明** 任给 $G>0$，要找 $\delta>0$，使 $-\delta<x-1<0$ 时 $\dfrac{x^2}{x-1}<-G$。

先加上条件 $-\frac12<x-1<0$，此时 $x>\frac12$，故 $x^2>\frac14$，于是

$$\frac{x^2}{x-1}<\frac{1}{4(x-1)} .$$

取 $\delta=\min\left\{\frac12,\dfrac{1}{4G}\right\}$，当 $-\delta<x-1<0$ 时

$$\frac{x^2}{x-1}<\frac{1}{4(x-1)}<-\frac{1}{4\delta}\le-G .$$

故极限为 $-\infty$。

> **易错点**：这里的方向必须看清：$x-1<0$ 使分母为负，所以 $x^2>\frac14$ 会让整个分式**更小**（更负），这正是我们需要的方向。若分子分母的符号关系搞反，放缩方向就错了。

## 扩充定义后性质的变化

定义扩充了，原来那些性质要逐条检查是否还成立。

1. **局部保序性与夹逼性**：只当函数极限 $A$ 为有限数、$+\infty$ 或 $-\infty$ 时才成立。必须排除 $A$ 是未定号的无穷大 $\infty$，因为 $\infty$ 无法与其他量比较大小。
2. **四则运算**：只要不出现待定型，如 $\infty-\infty$、$(+\infty)-(+\infty)$、$0\cdot\infty$、$\frac00$、$\frac\infty\infty$，法则是成立的。出现待定型就必须对具体问题具体分析。
3. **Heine 定理**：每种过程都有相应的版本，叙述、证明方法与作用都类似。

**定理 2''（$x\to+\infty$ 的 Heine 定理）** $\lim\limits_{x\to+\infty}f(x)=A$ 的充要条件是：对任意满足 $\lim\limits_{n\to\infty}x_n=+\infty$ 的数列 $\{x_n\}$，有 $\lim\limits_{n\to\infty}f(x_n)=A$。

**定理 2'''（Heine 定理的加强形式）** $\lim\limits_{x\to+\infty}f(x)$ 存在且有限，当且仅当：对任意满足 $x_n\to+\infty$ 的数列，$\{f(x_n)\}$ 都收敛。

加强形式同样靠"交错排列"把两个候选极限拉成同一个，去掉对极限值的预设。

## 函数极限的计算举例

**例 8** 讨论

$$L=\lim_{x\to\infty}\frac{a_nx^n+a_{n-1}x^{n-1}+\cdots+a_kx^k}{b_mx^m+b_{m-1}x^{m-1}+\cdots+b_jx^j},\qquad l=\lim_{x\to0}\frac{a_nx^n+a_{n-1}x^{n-1}+\cdots+a_kx^k}{b_mx^m+b_{m-1}x^{m-1}+\cdots+b_jx^j},$$

其中 $a_n,a_k,b_m,b_j$ 都是非零实数。

**解（$x\to\infty$ 的情形）** 分子分母同除以分母的最高次幂 $x^m$：

$$L=\lim_{x\to\infty}x^{n-m}\cdot\frac{a_n+\frac{a_{n-1}}{x}+\cdots+\frac{a_k}{x^{n-k}}}{b_m+\frac{b_{m-1}}{x}+\cdots+\frac{b_j}{x^{m-j}}}=\begin{cases}\dfrac{a_n}{b_m}, & n=m,\\[6pt] 0, & n<m,\\[4pt] \infty, & n>m.\end{cases}$$

**解（$x\to0$ 的情形）** 分子分母同除以分母的最低次幂 $x^j$：

$$l=\lim_{x\to0}x^{k-j}\cdot\frac{a_nx^{n-k}+a_{n-1}x^{n-k-1}+\cdots+a_k}{b_mx^{m-j}+b_{m-1}x^{m-j-1}+\cdots+b_j}=\begin{cases}\dfrac{a_k}{b_j}, & k=j,\\[6pt] 0, & k>j,\\[4pt] \infty, & k<j.\end{cases}$$

两句话总结：**$x\to\infty$ 时看最高次项系数，$x\to0$ 时看最低次项系数。** 原因很直接：$x$ 很大时最高次项压倒其他项，$x$ 很小时最低次项（次数最小的那个）压倒其他项。这与数列里多项式之比的结论（例 21）是同一件事。

**例 9** 证明 $\lim\limits_{x\to\infty}\left(1+\dfrac1x\right)^x=e$。

**证明** 先证 $x\to+\infty$ 的情形。对任意 $x\ge1$，记 $[x]$ 为 $x$ 的整数部分，则 $[x]\le x<[x]+1$，于是

$$\left(1+\frac{1}{[x]+1}\right)^{[x]}<\left(1+\frac1x\right)^x<\left(1+\frac{1}{[x]}\right)^{[x]+1}.$$

这里左边的底数比 $1+\frac1x$ 小、指数也比 $x$ 小，右边底数和指数都更大，所以不等号方向如写。

当 $x\to+\infty$ 时 $[x]\to+\infty$，不等式两端都是数列极限：

$$\lim_{n\to\infty}\left(1+\frac{1}{n+1}\right)^n=e,\qquad \lim_{n\to\infty}\left(1+\frac1n\right)^{n+1}=e .$$

由函数极限的夹逼性，

$$\lim_{x\to+\infty}\left(1+\frac1x\right)^x=e .$$

再证 $x\to-\infty$ 的情形。令 $y=-x$，则 $x\to-\infty$ 时 $y\to+\infty$，且

$$\left(1+\frac1x\right)^x=\left(1-\frac1y\right)^{-y}=\left(\frac{y}{y-1}\right)^{y}=\left(1+\frac{1}{y-1}\right)^{y}=\left(1+\frac{1}{y-1}\right)^{y-1}\cdot\left(1+\frac{1}{y-1}\right)\longrightarrow e\cdot1=e .$$

两情形合并得 $\lim\limits_{x\to\infty}\left(1+\frac1x\right)^x=e$。

这个证明的要点是把**连续变量夹在两个数列之间**：$[x]$ 与 $[x]+1$ 是整数，从而把函数极限归到已经证过的数列极限上。$x\to-\infty$ 一侧则用代换 $y=-x$ 化归，代换后再凑成 $y-1$ 的结构，是为了让指数与底数匹配成 $\left(1+\frac1\square\right)^{\square}$ 的形状。

由变量代换还可推出

$$\lim_{x\to\infty}\left(1-\frac1x\right)^x=\frac1e .$$

## 函数极限的柯西收敛原理

**定理 3** 函数极限 $\lim\limits_{x\to+\infty}f(x)$ 存在且有限的充分必要条件是：对任意 $\varepsilon>0$，存在 $X>0$，使得对一切 $x',x''>X$ 成立

$$|f(x')-f(x'')|<\varepsilon .$$

**必要性。** 设 $\lim\limits_{x\to+\infty}f(x)=A$，则存在 $X>0$，当 $x',x''>X$ 时

$$|f(x')-A|<\frac\varepsilon2,\qquad |f(x'')-A|<\frac\varepsilon2,$$

于是 $|f(x')-f(x'')|<\varepsilon$。

**充分性。** 任取数列 $x_n\to+\infty$。对上述 $X>0$，存在 $N$，当 $n>N$ 时 $x_n>X$。于是当 $m>n>N$ 时

$$|f(x_n)-f(x_m)|<\varepsilon,$$

这说明 $\{f(x_n)\}$ 是基本数列，因而收敛。由 Heine 定理的加强形式（定理 2'''），$\lim\limits_{x\to+\infty}f(x)$ 存在且有限。

> **关键结论**：证明的结构与数列情形完全一致：**柯西条件给出"函数值数列是基本列"，再用 Heine 定理的加强形式把"每个数列都收敛"翻译成"函数极限存在"**。注意这里必须用加强形式，因为柯西条件本身不告诉我们极限值是多少。

**定理 4** 函数极限 $\lim\limits_{x\to x_0}f(x)$ 存在且有限的充分必要条件是：对任意 $\varepsilon>0$，存在 $\delta>0$，使得对一切 $x',x''\in O(x_0,\delta)\setminus\{x_0\}$ 成立

$$|f(x')-f(x'')|<\varepsilon .$$

证明仿照定理 3，把 $X$ 换成 $\delta$、把 $x_n\to+\infty$ 换成 $x_n\to x_0$，用数列柯西收敛原理与 Heine 定理即可。

## 课堂小结

主线是：先用瞬时速度这个物理问题说明"必须去心、必须取极限"，再给出 $\varepsilon$-$\delta$ 定义并逐条解释它的含义，然后用定义验证几个基本极限（$e^x$、多项式商、$\frac{\sin x}{x}$），接着建立唯一性、局部保序性、局部有界性与夹逼性，把四则运算搬过来，再用 Heine 定理把函数极限与数列极限打通，最后把定义扩充到六种过程与四种函数值，并以柯西收敛原理收尾。

易错的地方有四处。

一是定义中 $0<|x-x_0|$ 不能漏，极限与 $f(x_0)$ 无关。

二是 $\varepsilon$-$\delta$ 证明要先限制 $\delta\le1$ 之类的条件把无界因子压成常数，再让 $|x-x_0|$ 承担 $\varepsilon$。

三是 Heine 定理的否命题量词要写对（$\exists\varepsilon_0\forall\delta\exists x$），否定写错则整个反证无效。

四是含 $\infty$ 的运算：保序性与夹逼性对未定号的 $\infty$ 不成立，四则运算碰到待定型必须另作处理。
