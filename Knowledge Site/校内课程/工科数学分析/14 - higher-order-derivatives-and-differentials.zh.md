---
slug: "14-higher-order-derivatives-and-differentials"
title: "高阶导数和高阶微分"
summary: "第 14 讲：高阶导数和高阶微分。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "14"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "14高阶导数和高阶微分.pdf"
    url: "https://drive.google.com/file/d/1w-zxonwxUwuA5gUANhx90LGlNhQ6RTGc/view?usp=drivesdk"
---

导数还是函数，可以再求导。再求一次得到二阶导数，如此继续得到 $n$ 阶导数。物理上，位置对时间的一阶导数是速度，二阶导数是加速度；这也是高阶导数最早出现的地方。高阶微分则要把"对微分再微分"这件事做清楚，这里会看到一个重要现象：一阶微分的形式不变性，到二阶就失效了。

## 从加速度说起

牛顿第二定律 $F=ma$ 中的加速度，是速度对时间的变化率。设物体的位置为 $S(t)$，速度为 $v(t)=S'(t)$，则加速度


$$
a(t)=v'(t)=S''(t).
$$

自由落体 $S(t)=\frac12gt^2$，于是


$$
v(t)=S'(t)=gt,\qquad a(t)=v'(t)=S''(t)=g .
$$

自由落体是匀加速运动，加速度是常数 $g$，所以二阶导数恒为 $g$。如果运动不是匀加速的，$S''(t)$ 就不是常数，它仍然表示瞬时加速度。

## 高阶导数的定义

**定义 1** (1) 设 $y=f(x)$ 在 $(a,b)$ 上可导。若导函数 $f'(x)$ 在 $(a,b)$ 上仍可导，则称 $\left(f'(x)\right)'$ 为 $f(x)$ 的**二阶导数**，记作


$$
f''(x)\quad\text{或}\quad y''(x),
$$

这时称 $f(x)$ 二阶可导。

(2) 归纳地，若 $y=f(x)$ 在 $(a,b)$ 上有 $n-1$ 阶导函数 $f^{(n-1)}(x)$，且它仍可导，则称 $\left(f^{(n-1)}(x)\right)'$ 为 $f(x)$ 的 **$n$ 阶导数**，记作


$$
f^{(n)}(x)\quad\text{或}\quad y^{(n)}(x).
$$

记号上，$n\le3$ 时写 $f'(x)$、$f''(x)$、$f'''(x)$；$n\ge4$ 时写 $f^{(4)}(x)$、$f^{(5)}(x),\cdots$，括号不能省，否则撇号太多。

> **理解关键**：二阶导数的含义是"导数的变化率"。$f''(x_0)>0$ 说明 $f'$ 在 $x_0$ 附近递增，曲线在该点附近向上弯曲；$f''(x_0)<0$ 则向下弯曲。这个几何解释在讨论函数凸性时会用到。

## 基本函数的高阶导数

**例 1** 求 $y=\mathrm e^x$ 与 $y=a^x\ (a>0)$ 的 $n$ 阶导数。

**解** $\mathrm e^x$ 求导不变，故


$$
\left(\mathrm e^x\right)^{(n)}=\mathrm e^x .
$$

$a^x$ 每求一次导就多一个因子 $\ln a$：


$$
\left(a^x\right)'=a^x\ln a,\qquad \left(a^x\right)''=a^x(\ln a)^2,\qquad \cdots,\qquad \left(a^x\right)^{(n)}=a^x(\ln a)^n .
$$

**例 2** 求 $y=\sin x$ 与 $y=\cos x$ 的 $n$ 阶导数。

**解** 关键是把 $\cos x$ 也写成 $\sin$：


$$
(\sin x)'=\cos x=\sin\left(x+\frac\pi2\right).
$$

再求一次导，


$$
(\sin x)''=\cos\left(x+\frac\pi2\right)=\sin\left(x+\frac\pi2+\frac\pi2\right)=\sin\left(x+\frac{2\pi}2\right).
$$

归纳可得


$$
(\sin x)^{(n)}=\sin\left(x+\frac{n\pi}{2}\right),\qquad n\ge0 .
$$

同理，由 $\cos x=\sin\left(x+\frac\pi2\right)$ 得


$$
(\cos x)^{(n)}=\cos\left(x+\frac{n\pi}{2}\right),\qquad n\ge0 .
$$

这个公式的用法是"求几次导，相位加几个 $\frac\pi2$"：每求导一次，正弦变余弦、余弦变负正弦，正好对应相位前进 $\frac\pi2$。

**例 3** 求幂函数 $y=x^m$（$m$ 为正整数）的 $n$ 阶导数。

**解** 逐次求导：


$$
(x^m)'=mx^{m-1},\qquad (x^m)''=m(m-1)x^{m-2},\qquad (x^m)'''=m(m-1)(m-2)x^{m-3}.
$$

一般地，


$$
(x^m)^{(n)}=m(m-1)\cdots(m-n+1)x^{m-n},\qquad n\le m .
$$

当 $n>m$ 时，求到第 $m$ 阶已经变成常数 $m!$，再求导就是 $0$：


$$
(x^m)^{(n)}=0,\qquad n>m .
$$

特别地，$(x^m)^{(m)}=m!$。这条性质在下一讲用泰勒公式时会反复出现：多项式的 $n$ 阶导数在 $n$ 超过次数后全为零。

**例 4** 求 $y=\ln x$ 的 $n$ 阶导数。

**解** $(\ln x)'=x^{-1}$，之后每次求导都按幂函数法则，指数减一，系数累乘：


$$
\begin{aligned}
(\ln x)'&=x^{-1},\\
(\ln x)''&=-x^{-2},\\
(\ln x)'''&=2x^{-3},\\
(\ln x)^{(4)}&=-3\cdot2x^{-4}.
\end{aligned}

$$

符号每求一次导变一次，系数是 $(n-1)!$，故


$$
(\ln x)^{(n)}=(-1)^{n-1}(n-1)!\,x^{-n}=\frac{(-1)^{n-1}(n-1)!}{x^n},\qquad n\ge1 .
$$

顺带得到


$$
\left(\frac1x\right)^{(n)}=\left(x^{-1}\right)^{(n)}=(-1)^n n!\,x^{-n-1}=\frac{(-1)^nn!}{x^{n+1}} .
$$

注意两者的差别：$\ln x$ 的 $n$ 阶导数分母是 $x^n$、系数是 $(n-1)!$；$1/x$ 的 $n$ 阶导数分母是 $x^{n+1}$、系数是 $n!$。前者是后者的"一次原函数"，阶数错开一位。

## Leibniz 公式

**定理 1** 设 $f,g$ 都 $n$ 阶可导，则

(1) $\left(c_1f(x)+c_2g(x)\right)^{(n)}=c_1f^{(n)}(x)+c_2g^{(n)}(x)$；

(2) **Leibniz 公式**


$$
[f(x)g(x)]^{(n)}=\sum_{k=0}^{n}C_n^kf^{(n-k)}(x)g^{(k)}(x),\qquad C_n^k=\frac{n!}{k!(n-k)!}.
$$

这个公式与二项式定理


$$
(a+b)^n=\sum_{k=0}^nC_n^ka^{n-k}b^k
$$

形状完全一样，只是把"乘方"换成了"求 $n$ 阶导"。

**证明** (1) 由一阶导数的线性性归纳即得。

(2) 对 $n$ 归纳。$n=1$ 时，


$$
[fg]'=f'g+fg'=C_1^0f'g+C_1^1fg' .
$$

设 $n=m$ 时公式成立：


$$
[fg]^{(m)}=\sum_{k=0}^mC_m^kf^{(m-k)}g^{(k)} .
$$

两边再求一次导：


$$
\begin{aligned}
[fg]^{(m+1)}
&=\sum_{k=0}^mC_m^kf^{(m-k+1)}g^{(k)}+\sum_{k=0}^mC_m^kf^{(m-k)}g^{(k+1)} .
\end{aligned}

$$

第二个和式中令 $j=k+1$，化为


$$
\sum_{j=1}^{m+1}C_m^{j-1}f^{(m+1-j)}g^{(j)} .
$$

于是


$$
\begin{aligned}
[fg]^{(m+1)}
&=f^{(m+1)}g+\sum_{k=1}^{m}\left(C_m^k+C_m^{k-1}\right)f^{(m+1-k)}g^{(k)}+fg^{(m+1)} .
\end{aligned}

$$

由组合恒等式 $C_m^k+C_m^{k-1}=C_{m+1}^k$，以及 $C_{m+1}^0=C_{m+1}^{m+1}=1$，上式就是


$$
[fg]^{(m+1)}=\sum_{k=0}^{m+1}C_{m+1}^kf^{(m+1-k)}g^{(k)} .
$$

故公式对 $n=m+1$ 也成立，由归纳法得证。

证明的关键是"错位相加"：一个和式求导后，$f$ 的阶数加一；另一个和式求导后，$g$ 的阶数加一。把 $g$ 的阶数对齐，两项的系数正好是杨辉三角相邻两数之和。

**例 5** 求 $y=(3x^2-2)\sin2x$ 的 100 阶导数。

**解** 把 $3x^2-2$ 看作 $f$，$\sin2x$ 看作 $g$，用 Leibniz 公式。由于


$$
(3x^2-2)'=6x,\qquad (3x^2-2)''=6,\qquad (3x^2-2)^{(k)}=0\ (k\ge3),
$$

和式中只有 $k=0,1,2$ 三项不为零：


$$
y^{(100)}=(\sin2x)^{(100)}(3x^2-2)+C_{100}^1(\sin2x)^{(99)}(3x^2-2)'+C_{100}^2(\sin2x)^{(98)}(3x^2-2)'' .
$$

由 $(\sin2x)^{(n)}=2^n\sin\left(2x+\frac{n\pi}{2}\right)$（每求一次导，内层 $2x$ 贡献一个因子 $2$，相位前进 $\frac\pi2$），


$$
(\sin2x)^{(100)}=2^{100}\sin(2x+50\pi)=2^{100}\sin2x,
$$


$$
(\sin2x)^{(99)}=2^{99}\sin\left(2x+\frac{99\pi}{2}\right)=-2^{99}\cos2x,
$$


$$
(\sin2x)^{(98)}=2^{98}\sin(2x+49\pi)=-2^{98}\sin2x .
$$

代入，并用 $C_{100}^1=100$、$C_{100}^2=4950$：


$$
\begin{aligned}
y^{(100)}
&=2^{100}(3x^2-2)\sin2x-100\cdot2^{99}\cdot6x\cos2x-4950\cdot2^{98}\cdot6\sin2x\\
&=2^{98}\left[(12x^2-29708)\sin2x-1200x\cos2x\right].
\end{aligned}

$$

最后一步是把 $2^{100}(3x^2-2)=2^{98}\cdot4(3x^2-2)$，常数项 $-8-29700=-29708$，而 $-100\cdot2^{99}\cdot6x=-1200x\cdot2^{98}$。

Leibniz 公式适用于两个因子都 $n$ 阶可导的情形，并不要求某个因子高阶导数为零。这里一个因子是二次多项式，三阶以上导数都为零，所以求和只剩三项，计算尤其方便。

## 复合函数的二阶导数

**例 6** 求 $y=\mathrm e^{\sin x}$ 的二阶导数。

**解** 先求一阶导：


$$
y'=\mathrm e^{\sin x}\cos x .
$$

再求一次导，用乘积法则，注意 $\mathrm e^{\sin x}$ 还要再用一次链式法则：


$$
\begin{aligned}
y''&=\left(\mathrm e^{\sin x}\right)'\cos x+\mathrm e^{\sin x}(\cos x)'\\
&=\mathrm e^{\sin x}\cos x\cdot\cos x+\mathrm e^{\sin x}(-\sin x)\\
&=\mathrm e^{\sin x}\left(\cos^2x-\sin x\right).
\end{aligned}

$$

二阶链式法则不能照搬一阶公式，只把导数符号改成二阶。一般来说，


$$
[f(g(x))]''\ne f''(g(x))\,g''(x),
$$

正确的式子是


$$
[f(g(x))]''=f''(g(x))\,[g'(x)]^2+f'(g(x))\,g''(x).
$$

如果误用"$f''(g(x))g''(x)$"，本例会得到


$$
\left(\mathrm e^u\right)''\big|_{u=\sin x}\cdot(\sin x)''=\mathrm e^{\sin x}\cdot(-\sin x),
$$

> **易错点**：与正确答案相差一项 $\mathrm e^{\sin x}\cos^2x$。多出来的这一项来自 $g'(x)$ 的平方：外层函数在内层的取值处弯曲，内层本身的变化率又要平方。

## 隐函数的二阶导数

**例 7** 求由 $\mathrm e^{xy}+x^2y-1=0$ 确定的隐函数 $y=y(x)$ 的二阶导数。

**解** 两边对 $x$ 求导：


$$
\mathrm e^{xy}(y+xy')+2xy+x^2y'=0 . \tag{1}
$$

解出


$$
y'=-\frac{(\mathrm e^{xy}+2x)y}{(\mathrm e^{xy}+x)x}. \tag{2}
$$

对 (1) 再求一次导，注意 $y$ 与 $y'$ 都是 $x$ 的函数：


$$
\left(\mathrm e^{xy}\right)'(y+xy')+\mathrm e^{xy}(y+xy')'+2y+2xy'+2xy'+x^2y''=0 .
$$

其中 $\left(\mathrm e^{xy}\right)'=\mathrm e^{xy}(y+xy')$，$(y+xy')'=y'+y'+xy''=2y'+xy''$，代入整理：


$$
\mathrm e^{xy}(y+xy')^2+\mathrm e^{xy}(2y'+xy'')+2y+4xy'+x^2y''=0 .
$$

把含 $y''$ 的项归并：


$$
y''\left(x\mathrm e^{xy}+x^2\right)=-\left[\mathrm e^{xy}(y+xy')^2+2\mathrm e^{xy}y'+2y+4xy'\right],
$$

故


$$
y''=-\frac{\mathrm e^{xy}\left[(y+xy')^2+2y'\right]+(2y+4xy')}{x\left(\mathrm e^{xy}+x\right)} . \tag{3}
$$

把 (2) 代入 (3) 化简，得


$$
y''=\frac{2y\mathrm e^{3xy}+8xy\mathrm e^{2xy}+(12x^2y-x^3y^2)\mathrm e^{xy}+6x^3y}{x^2\left(\mathrm e^{xy}+x\right)^3} .
$$

隐函数的高阶导数没有可以套用的公式，只能一步一步求：先求 $y'$，再对含 $y'$ 的等式求导得到 $y''$ 的表达式，最后把 $y'$ 代回去。代回之前 (3) 已经是正确答案，只是还含 $y'$；考试中若不要求完全用 $x,y$ 表示，写到 (3) 即可。

## 参数方程的二阶导数

设 $x=\varphi(t)$，$y=\psi(t)$，已知


$$
y'(x)=\frac{\mathrm dy}{\mathrm dx}=\frac{\psi'(t)}{\varphi'(t)}\triangleq\xi(t).
$$

$y'(x)$ 仍然是 $t$ 的函数，与 $x=\varphi(t)$ 一起构成一个新的参数方程。对它再用一次参数方程求导公式：


$$
y''(x)=\frac{\mathrm d\xi}{\mathrm dx}=\frac{\xi'(t)}{\varphi'(t)}=\frac{\dfrac{\psi''(t)\varphi'(t)-\psi'(t)\varphi''(t)}{[\varphi'(t)]^2}}{\varphi'(t)}
=\frac{\psi''(t)\varphi'(t)-\psi'(t)\varphi''(t)}{[\varphi'(t)]^3}.
$$

> **易错点**：注意 $y''(x)\ne\dfrac{\psi''(t)}{\varphi''(t)}$。二阶导数是"对 $x$ 求两次导"，不是"对 $t$ 求两次导再相除"。

**例 8** 求旋轮线


$$
\begin{cases}x=t-\sin t,\\ y=1-\cos t,\end{cases}\qquad 0\le t\le2\pi
$$

在 $t=\pi$ 处的二阶导数。

**解** 一阶导为


$$
y'(x)=\frac{(1-\cos t)'}{(t-\sin t)'}=\frac{\sin t}{1-\cos t}=\cot\frac t2 .
$$

于是 $y'(x)=\cot\dfrac t2$ 与 $x=t-\sin t$ 构成参数方程，再求导：


$$
\begin{aligned}
y''(x)&=\frac{\left(\cot\frac t2\right)'}{(t-\sin t)'}
=\frac{-\frac12\csc^2\frac t2}{1-\cos t}\\
&=-\frac{1}{2}\csc^2\frac t2\cdot\frac{1}{2\sin^2\frac t2}
=-\frac14\csc^4\frac t2 .
\end{aligned}

$$

这里用了 $1-\cos t=2\sin^2\dfrac t2$。当 $t=\pi$ 时，$\csc\dfrac\pi2=1$，


$$
y''(x)\big|_{t=\pi}=-\frac14 .
$$

负号说明曲线在 $t=\pi$ 处向下弯曲，与旋轮线在最高点附近的情形一致。

## 二阶微分与高阶微分

一阶微分 $\mathrm dy=f'(x)\mathrm dx$ 的两边再求微分，用乘积法则：


$$
\mathrm d(\mathrm dy)=\mathrm d\left(f'(x)\mathrm dx\right)=\mathrm d\left(f'(x)\right)\mathrm dx+f'(x)\,\mathrm d(\mathrm dx).
$$

第一项 $\mathrm d(f'(x))=f''(x)\mathrm dx$，所以是 $f''(x)(\mathrm dx)^2$。第二项中 $\mathrm dx=\Delta x$ 与 $x$ 无关，是常数，故 $\mathrm d(\mathrm dx)=0$。于是


$$
\mathrm d^2y=f''(x)\,\mathrm dx^2 .
$$

记号约定：$\mathrm d^2y$ 是 $\mathrm d(\mathrm dy)$ 的简写，$\mathrm dx^2$ 表示 $(\mathrm dx)^2$。注意 $\mathrm d(x^2)=2x\,\mathrm dx$ 与 $\mathrm dx^2=(\mathrm dx)^2$ 完全不同，前者是对函数 $x^2$ 求微分，后者是微分 $\mathrm dx$ 的平方。

同样地，


$$
\mathrm d^3y=\mathrm d\left(f''(x)\mathrm dx^2\right)=f'''(x)\mathrm dx^3 .
$$

**定义 2** 设 $y=f(x)$ 有 $n$ 阶导数，定义 **$n$ 阶微分**


$$
\mathrm d^ny=f^{(n)}(x)\,\mathrm dx^n,\qquad n=1,2,3,\cdots
$$

于是


$$
f^{(n)}(x)=\frac{\mathrm d^ny}{\mathrm dx^n},\qquad n=1,2,\cdots
$$

当 $x$ 是自变量时，$\mathrm d^nx=0\ (n\ge2)$，因为 $\mathrm dx$ 是常数。

## 高阶微分没有形式不变性

**例 9** 求 $y=\mathrm e^{\sin x}$ 的二阶微分。

**解法一** 由例 6，$y''=\mathrm e^{\sin x}(\cos^2x-\sin x)$，故


$$
\mathrm d^2y=\mathrm e^{\sin x}\left(\cos^2x-\sin x\right)\mathrm dx^2 .
$$

**解法二（错误的做法）** 令 $u=\sin x$，$y=\mathrm e^u$，则


$$
\mathrm d^2y=\left(\mathrm e^u\right)''\mathrm du^2=\mathrm e^u\,\mathrm du^2=\mathrm e^{\sin x}\cos^2x\,\mathrm dx^2 .
$$

两个结果不相等，差了 $-\mathrm e^{\sin x}\sin x\,\mathrm dx^2$。问题出在 $u$ 不是自变量。

**正确的解法二** 对一阶微分 $\mathrm dy=\mathrm e^u\mathrm du$ 再求微分，此时 $u$ 是中间变量，$\mathrm du$ 不是常数，$\mathrm d(\mathrm du)\ne0$：


$$
\begin{aligned}
\mathrm d^2y&=\mathrm d\left(\mathrm e^u\mathrm du\right)=\mathrm d\left(\mathrm e^u\right)\mathrm du+\mathrm e^u\,\mathrm d(\mathrm du)\\
&=\mathrm e^u\,\mathrm du^2+\mathrm e^u\,\mathrm d^2u .
\end{aligned}

$$

由 $u=\sin x$，$\mathrm du=\cos x\,\mathrm dx$，$\mathrm d^2u=(\sin x)''\mathrm dx^2=-\sin x\,\mathrm dx^2$，代入：


$$
\mathrm d^2y=\mathrm e^{\sin x}\cos^2x\,\mathrm dx^2-\mathrm e^{\sin x}\sin x\,\mathrm dx^2=\mathrm e^{\sin x}\left(\cos^2x-\sin x\right)\mathrm dx^2,
$$

与解法一一致。

结论是：**高阶微分不具有形式不变性**。当 $u$ 是中间变量时，


$$
\mathrm d^2y\ne f''(u)\,\mathrm du^2,
$$

正确的公式是


$$
\mathrm d^2y=f''(u)\,\mathrm du^2+f'(u)\,\mathrm d^2u .
$$

> **理解关键**：一阶微分之所以有形式不变性，是因为 $\mathrm du=g'(x)\mathrm dx$ 无论 $u$ 是不是自变量都成立；到了二阶，多出来的 $f'(u)\mathrm d^2u$ 一项在 $u$ 为自变量时为零（$\mathrm d^2u=0$），在 $u$ 为中间变量时一般不为零。这也解释了为什么 $\dfrac{\mathrm d^2y}{\mathrm dx^2}$ 不能像一阶微商那样随意拆成两个微分之商。

## 课堂小结

这一讲的主线是：导数可以逐次求，得到高阶导数；基本函数的 $n$ 阶导数有固定规律（指数函数、正弦余弦的相位移动、幂函数降次、对数函数的阶乘系数）；乘积的 $n$ 阶导数用 Leibniz 公式，与二项式定理同构；复合、隐函数与参数方程的二阶导数可由逐次求导得到，要保留链式法则和乘积法则产生的各项；高阶微分定义为 $\mathrm d^ny=f^{(n)}(x)\mathrm dx^n$，只对自变量成立，对中间变量要加上 $f'(u)\mathrm d^2u$ 一项。

容易出错的地方有四处。

第一，$(\sin x)^{(n)}$ 的相位是 $\frac{n\pi}{2}$，$(\cos x)^{(n)}$ 也是 $\frac{n\pi}{2}$ 而不是 $\frac{(n+1)\pi}{2}$，区别在于是 $\sin$ 还是 $\cos$。

第二，Leibniz 公式中 $C_n^k$ 与求导阶数要配对：$f$ 求 $n-k$ 阶、$g$ 求 $k$ 阶，写反了结果一样但中间过程容易漏项。

第三，参数方程的二阶导数是 $\dfrac{\psi''\varphi'-\psi'\varphi''}{(\varphi')^3}$，分母是三次方，不是 $\varphi''$。

第四，隐函数二阶导数要把 $y'$ 代回，且代回前要先整理成 $y''$ 的显式，否则容易在求导时把 $y'$ 当常数。
