---
slug: 03-calculus-and-linear-algebra
title: "Python在高等数学和线性代数中的应用"
summary: "用 SymPy 和 SciPy 计算符号解、近似数值解与线性代数问题。"
updatedAt: 2026-11-26
content_type: technical-tutorial
sources:
  - kind: article
    title: "《Python数学实验与建模》第 3 章（印刷页 85–121）"
    url: https://drive.google.com/file/d/1lSNaIF0mLU0hwT1Rc5ee9raRK68fohFQ/view
---

> **原书范围** 第 3 章（印刷页 85–121）

> 原书 p.85 章首语：科学计算涉及**数值计算**和**符号计算**，Python 中作基础数值计算使用 NumPy 和 SciPy 工具库，作符号运算使用 SymPy 工具库。本章先介绍 SymPy、SciPy 两个基础工具库，然后介绍符号函数画图，最后给出 Python 在高等数学和线性代数等方面的应用。

## 3.1 SymPy 工具库介绍

### 3.1.1 SymPy 工具库简介

（原书 p.85–87）SymPy 是 Python 版的开源计算机代数系统，通俗地讲，是用于**符号运算**的工具库。用 `>>> help('sympy')` 可看到模块名称。常用模块（原书 p.85–87）：

| 模块 | 作用 |
| --- | --- |
| `abc` | 符号变量模块 |
| `calculus` | 积分相关方法 |
| `core` | 基本的加、乘、指数运算等 |
| `discrete` | 离散数学 |
| `functions` | 基本的函数和特殊函数 |
| `galgebra` | 几何代数 |
| `geometry` | 几何实体 |
| `integrals` | 符号积分 |
| `interactive` | 交互会话（如 IPython） |
| `logic` | 布尔代数和定理证明 |
| `matrices` | 线性代数和矩阵 |
| `ntheory` | 数论函数 |
| `physics` | 物理学 |
| `plotting` | 用 Pyglet 进行二维和三维的画图 |
| `polys` | 多项式代数和因式分解 |
| `printing` | 漂亮的打印和代码生成 |
| `series` | 级数 |
| `simplify` | 化简符号表达式 |
| `solvers` | 方程求解 |
| `stats` | 统计学 |

原书随后对六个模块作了展开（p.86–87），这几段是"库能力地图"，值得记住"什么活该找谁"：

1. **微积分模块（`sympy.integrals`）**：支持大量基础与高级微积分运算，如导数、积分、级数展开、微分方程及有限差分方程；还支持积分变换；微分中还支持数值微分、复合导数和分数阶导数。
2. **离散数学模块（`sympy.discrete`）**：处理整数、图形及逻辑学中的问题，对二项式系数、乘积与求和、运算有完整支持。
3. **方程求解模块（`sympy.solvers`）**：具有解复数多项式及多项式组的能力，可解代数方程、常微分方程、偏微分方程和差分方程。
4. **矩阵模块（`sympy.matrices`）**：矩阵与行列式计算，可构造全 0、全 1、随机矩阵及矩阵运算；还支持黑塞矩阵（Hessian）、格拉姆-施密特（Gram-Schmidt）正交化、朗斯基（Wronskian）行列式等；另支持特征值与特征向量、转置、行列式求解、因式分解算法、零空间（null space）计算、代数余子式展开以及伴随矩阵。
5. **物理学模块（`sympy.physics`）**：经典力学、量子力学、高能物理；一维与三维空间的泡利代数与量子谐振子；光学相关功能；另有独立模块把物理单位集成进 SymPy，可选择相应单位完成计算与单位转换。
6. **统计学模块（`sympy.stats`）**：连续与离散随机分布函数，还支持符号概率相关功能；库中随机分布函数都支持随机数生成功能。

### 3.1.2 符号运算基础知识

（原书 p.87–88）用 SymPy 做符号计算，首先要建立**符号变量**与**符号表达式**。符号变量是构成符号表达式的基本元素，通过 `symbols()` 创建：

```python
>>> from sympy import *
>>> x=symbols('x')
>>> y,z=symbols('y z')
```

构建多个符号变量时，**中间以空格分隔**。注意语句 `x=symbols('x')` 中，`x` 是符号变量的**名称**，而 `'x'` 是符号变量的**值**（用于显示），名称和值不一定相同，例如 `>>> var_v=Symbol('v')` 同样声明一个值为 `'v'` 的符号变量 `var_v`。

> **补充：两种声明多个变量的方法**
> 一种是用空格分隔的符号名称传入（`symbols('x y z')`），另一种是把 `m0:4` 传入（`symbols('m0:4')`）生成 `m0, m1, m2, m3` 的符号序列。后者在需要"一大家族变量"时最省事。

在符号计算中，使用 `evalf()` 或 `n()` 方法获得浮点近似值，**默认精度是小数点后 15 位**，可通过调整参数改成任何精度。

**例 3.1（原书 p.87–88）** 符号创建、类型转换及 `subs()` 方法代入值。

```python
# 程序文件 Pex3_2.py     ← 原书此处编号疑有误，按例号应为 Pex3_1.py
from sympy import *
x,y,z=symbols('x y z')
m0,m1,m2,m3=symbols('m0:4')   # 创建多个符号变量
x=sin(1)
print("x=",x); print("x=",x.evalf())
print("x=",x.n(16))    # 显示小数点后 16 位数字
print("pi 的两种显示格式:{},{}".format(pi,pi.evalf(3)))
                # 这里不能使用 n() 函数
expr1=y*sin(y**2)   # 创建第一个符号表达式
expr2=y**2+sin(y)*cos(y)+sin(z)  # 创建第二个符号表达式
print("expr1=",expr1)
print("y=5时，expr1=",expr1.subs(y,5))   # 代入一个符号变量的值
print("y=2,z=3时，expr2=",expr2.subs({y:2,z:3}))  # 代入 y=2,z=3
print("y=2,z=3时，expr2=",expr2.subs({y:2,z:3}).n())
                          # 以浮点数显示计算结果
```

运行结果（原书 p.88）：

```
x=sin(1)
x=0.841470984807897
x=0.8414709848078965
pi 的两种显示格式:pi,3.14
expr1= y*sin(y**2)
y=5时，expr1=5*sin(25)
y=2,z=3时，expr2=sin(2)*cos(2)+sin(3)+4
y=2,z=3时，expr2=3.76271876040590
```

> **注意 `pi` 那行的"陷阱"**
> `pi.evalf(3)` 给 `3.14`（3 位有效数字），而 `x.n(16)` 给 16 位有效数字。**`n()` 与 `evalf()` 是同一方法**，原书注释"这里不能使用 n() 函数"指的是：`pi` 是 SymPy 常数对象，`n()` 需要以方法形式调用（`pi.n()`），不能写成 `n(pi)` 除非先 `from sympy import n`——这是符号库里"函数形式"与"方法形式"混用时的常见冲突。

**例 3.2（原书 p.88）** 符号函数 `together()` 及 `apart()` 使用示例。

```python
# 程序文件 Pex3_2.py
from sympy import *
x1,x2,x3,x4=symbols('m1:5'); x=symbols('x')
print(x1/x2+x3/x4)
print(together(x1/x2+x3/x4))
print((2*x**2+3*x+4)/(x+1))
print(simplify((2*x**2+3*x+4)/(x+1)))  # 化简没有效果
print(apart((2*x**2+3*x+4)/(x+1)))
```

运行结果（原书 p.88）：

```
m1/m2 + m3/m4
(m1*m4 + m2*m3)/(m2*m4)
(2*x**2 + 3*x + 4)/(x + 1)
(2*x**2 + 3*x + 4)/(x + 1)
2*x + 1 + 3/(x + 1)
```

> **`simplify` 与 `apart` 的分工**
> `simplify` 是"通用化简"，对假分式常常**无能为力**（原书注释"化简没有效果"）；`apart` 是"部分分式分解"，专治有理式。**要拆成"多项式 + 真分式"，用 `apart`；要合并成一个大分式，用 `together`。** 三者互为逆操作，是符号计算里最常备的三个"整理抽屉"的工具。

---

## 3.2 SciPy 工具库简介

（原书 p.88–91）SciPy 是对 NumPy 的功能扩展，提供许多高级数学函数（微分、微分方程、优化算法、数值分析、高级统计函数、方程求解等）。它在 NumPy 数组框架上实现，对 NumPy 数组和基本数组运算进行扩展，满足科学家和工程师解决问题时用到的大部分数学计算功能。支持文件处理、积分、数值分析、优化方法、统计学、信号与图像处理、聚类分析和空间分析等。

### 1. 微积分模块（`scipy.integrate`）

支持数值积分和微分方程数值解。

**1) 给定函数的数值积分**

| 函数 | 用途 |
| --- | --- |
| `quad` | 一重数值积分 |
| `dblquad` | 二重数值积分 |
| `tplquad` | 三重数值积分 |
| `nquad` | 通用 $N$ 重积分 |
| `fixed_quad` | 使用固定阶高斯求积公式求数值积分 |
| `quadrature` | 使用固定误差限的高斯求积公式求数值积分 |
| `romberg` | 求函数的 Romberg 数值积分 |

> **注 3.1（原书 p.89）**
> 以下一般不给出函数用法的详细说明，读者可以查看相关函数的帮助信息，例如看 `romberg` 的帮助信息，使用命令：
> ```python
> >>> from scipy.integrate import romberg
> >>> help(romberg)
> ```

**2) 给定离散点的数值积分**

| 函数 | 用途 |
| --- | --- |
| `cumtrapz` | 用梯形法求数值积分 |
| `simps` | 用辛普森法求数值积分 |
| `romb` | 用 Romberg 积分法求自变量均匀间隔散点的数值积分 |

**3) 微分方程的数值解**

| 函数 | 用途 |
| --- | --- |
| `odeint` | 使用 FORTRAN 库中方法求微分方程组的数值解 |
| `ode` | 求一般微分方程组的数值解 |
| `complex_ode` | 求复微分方程组的数值解 |

### 2. 线性代数模块（`scipy.linalg`）

与原书说明一致：与 `numpy.linalg` 相比，`scipy.linalg` 函数有**更高级的特征**（如更全的分解、更细的控制参数）。

### 3. 优化模块（`scipy.optimize`）

提供解决**单变量和多变量**目标函数最小值问题的功能，通过大量算法解决最小化问题；支持线性回归、搜索函数的最大值与最小值、方程求根、线性规划、拟合等功能。（3.5.3、3.5.4 两节用的就是它。）

### 4. 插值模块（`scipy.interpolate`）

支持一维和多维插值，例如泰勒（Taylor）多项式插值、一维和多维样条插值。

### 5. 统计学模块（`scipy.stats`）

提供各种随机变量的分布、统计量计算、分布拟合、参数检验等功能。（2.5 节已详述。）

### 6. 傅里叶变换模块（`scipy.fftpack`）

离散傅里叶变换和离散傅里叶逆变换可分别用 `fft` 和 `ifft` 函数计算。

### 7. 信号处理模块（`scipy.signal`）

包含一系列滤波函数、滤波器设计函数，以及对一维和二维数据进行 B-样条插值的函数。可进行：卷积、B-样条、滤波、滤波器设计、MATLAB 式的 IIR 滤波器设计、连续时间的线性系统、离散时间的线性系统、线性时不变系统、信号波形、窗函数、小波分析和光谱分析等。

### 8. 多维图像处理模块（`scipy.ndimage`）

通常图像处理可看作对二维数组的操作，提供图像处理的各种函数，例如图像几何变换、图像滤波等。

### 9. 空间分析模块（`scipy.spatial`）

空间分析是用于分析空间数据的算法。空间数据指与地理空间或垂直空间相关的数据对象，包括点、线、多边形、其他几何和地理特征信息。该模块支持 Delaunay 三角剖分、Voronoi 图、$N$ 维凸包等功能，支持 KD 树（`scipy.spatial.kdtree`）实现快速近邻查找，还可以对初始向量集合进行距离矩阵的计算。

### 10. 聚类模块（`scipy.cluster`）

聚类是把大的集合分成多个组的过程。该模块包括两个子模块：向量量化（vector quantization, VQ，`scipy.cluster.vq`）和层次聚类（`scipy.cluster.hierarchy`）。VQ 支持 $K$ 均值聚类和向量量化，层次聚类支持分层聚类和聚合聚类。

### 11. 文件输入/输出模块（`scipy.io`）

支持一系列格式文件的读和写，包括 MATLAB 文件、ALD 文件、Matrix Market 文件、无格式的 FORTRAN 文件、WAV 声音文件、ARFF 文件和 NetCDF 文件。

SciPy 可使用 MATLAB 的 `.mat` 文件格式读写数据，函数为 `loadmat` 和 `savemat`：

```python
import scipy.io
data=scipy.io.loadmat('datafile.mat')
```

返回值 `data` 为一个**字典**，包含与 `.mat` 文件中保存的变量名相对应的键，对应值为 NumPy 数组格式。保存数据到 `.mat` 需先创建包含所有待保存变量的字典（变量名和值）：

```python
data={}; data['x']=x; data['y']=y
scipy.io.savemat('datafile.mat',data)
```

还有其他模块：如附件模块（`scipy.misc`）实现图形读写操作功能；稀疏矩阵及其相关算法模块（`scipy.sparse`）；特殊函数模块（`scipy.special`）等。

> **补充：`scipy.misc` 已基本清空**
> 新版 SciPy 中 `scipy.misc` 的图像读写函数（`imread`/`imsave`）已移除，改用 `imageio` 或 `matplotlib.pyplot.imread`。**读旧书时看到 `misc.imread` 报 AttributeError，不是代码写错，是库没了。**

---

## 3.3 用 SymPy 做符号函数画图

（原书 p.91–93）用 SymPy 做符号函数画图很方便，`sympy.plotting` 直接接受**符号表达式 + 变量范围**，无需先离散成数组。

### 1. 二维曲线画图

基本格式：`plot(表达式, 变量取值范围, 属性 = 属性值)`；多重绘制：`plot(表达式1, 表达式2, 变量取值范围, 属性 = 属性值)`，或 `plot((表达式1, 取值范围1), (表达式2, 取值范围2))`。

**例 3.3（原书 p.91）** 在同一图形界面上画出 $y_1=2\sin x$，$x\in[-6,6]$；$y_2=\cos\left(x+\dfrac{\pi}{4}\right)$，$x\in[-5,5]$。

```python
# 程序文件 Pex3_3.py
from sympy.plotting import plot
from sympy.abc import x,pi  # 引进符号变量 x 及常量 pi
from sympy.functions import sin,cos
plot((2*sin(x),(x,-6,6)),(cos(x+pi/4),(x,-5,5)))
```

> **为什么用"元组列表"而不是"逗号并列"**
> 两条曲线**定义域不同**，只能用 `plot((expr,range),(expr,range))` 的形式，每个元组自带自己的区间。若两条曲线同区间，才可写 `plot(e1,e2,(x,a,b))`。

### 2. 三维曲面画图

**例 3.4（原书 p.92，续例 2.41）** 画出三维曲面 $z=\sin\left(\sqrt{x^2+y^2}\right)$ 的图形。

```python
# 程序文件 Pex3_4.py
from pylab import rc   # pylab 为 matplotlib 的接口
from sympy.plotting import plot3d
from sympy.abc import x,y  # 引进符号变量 x,y
from sympy.functions import sin,sqrt
rc('font',size=16); rc('text',usetex=True)
plot3d(sin(sqrt(x**2+y**2)),(x,-10,10),(y,-10,10),xlabel='$x$',
    ylabel='$y$')
```

所画的图形如图 3.1（原书 p.92）。

> **与例 2.41 的对照**
> 同一曲面，例 2.41 走"NumPy 网格 + `plot_surface`"，本例走"符号表达式 + `plot3d`"。**前者需手动 `meshgrid` 与步长（30 点，图有折棱），后者由 SymPy 自适应取点（曲面更光顺但不可控）**。要在图里精确控制网格密度、色图、光照，仍应回到 Matplotlib。

### 3. 隐函数画图

**例 3.5（原书 p.92–93）** 绘制隐函数 $(x-1)^2+(y-2)^3-4=0$ 的图形。

```python
# 程序文件 Pex3_5_1.py
from pylab import rc
from sympy import plot_implicit as pt,Eq
from sympy.abc import x,y   # 引进符号变量 x,y
rc('font',size=16); rc('text',usetex=True)
pt(Eq((x-1)**2+(y-2)**3,4),(x,-6,6),(y,-2,4),xlabel='$x$',
    ylabel='$y$')
```

所画的图形如图 3.2（原书 p.93）：一条近似三次曲线的单支，$y$ 在 $[-2,4]$ 内。

或者使用**匿名函数（lambda 函数）**设计如下程序（原书 p.93）：

```python
# 程序文件 Pex3_5_2.py
from sympy import plot_implicit as pt
from sympy.abc import x,y   # 引进符号变量 x,y
ezplot=lambda expr:pt(expr)
ezplot((x-1)**2+(y-2)**3-4)
```

> **`plot_implicit` 的矩形范围不能省**
> 隐函数没有"自变量→因变量"的单值关系，必须给 $(x,x_{min},x_{max})$ 与 $(y,y_{min},y_{max})$ 的**矩形窗口**；窗口选小了会"缺支"，选大了网格变粗导致曲线断续。第二个版本没给范围，SymPy 用默认窗口——**方便但不可控**，正式出图应显式指定。

---

## 3.4 高等数学问题的符号解

（原书 p.93–97）SymPy 有许多功能，从基本符号算术到多项式、微积分、求解方程、离散数学和统计等。它主要处理三类数据：**整型数据、实数和有理数**。有理数包括两部分：分子和分母，可用 `Ration` 类定义有理数（原书作 "Ration"，通常写作 `Rational`）。

本节按七个主题走：求极限 → 求导数 → 级数求和 → 泰勒展开 → 积分 → 代数方程（组） → 微分方程（组）。**这条顺序正好是"微积分基本技能"的教学顺序，也是符号库能力的递进顺序。**

### 1. 求极限

**例 3.6（原书 p.93）** 验证 $\lim\limits_{x\to 0}\dfrac{\sin x}{x}=1$，$\lim\limits_{x\to+\infty}\left(1+\dfrac{1}{x}\right)^x=e$。

```python
# 程序文件 Pex3_6.py
from sympy import *
x=symbols('x')
print(limit(sin(x)/x,x,0))
print(limit(pow(1+1/x,x),x,oo))   # 这里是两个小"o"，表示正无穷
```

### 2. 求导数

**例 3.7（原书 p.93–94）** 已知 $z=\sin x+x^2e^y$，求 $\dfrac{\partial^2 z}{\partial x^2}$、$\dfrac{\partial z}{\partial y}$。

```python
# 程序文件 Pex3_7.py
from sympy import *
x,y=symbols('x y')   # 定义两个符号变量
z=sin(x)+x**2*exp(y) # 构造符号表达
print("关于 x 的二阶偏导数为: ",diff(z,x,2))
print("关于 y 的一阶偏导数为: ",diff(z,y))
```

本地复现（SymPy 1.14）：`2*exp(y) - sin(x)` 与 `x**2*exp(y)`，与手工推导一致。

### 3. 级数的求和

**例 3.8（原书 p.94）** 验证 $\sum\limits_{k=1}^{n}k^2=\dfrac{n(n+1)(2n+1)}{6}$，$\sum\limits_{k=1}^{\infty}\dfrac{1}{k^2}=\dfrac{\pi^2}{6}$。

```python
# 程序文件 Pex3_8.py
from sympy import *
k,n=symbols('k  n')
print(summation(k**2,(k,1,n)))
print(factor(summation(k**2,(k,1,n))))  # 把计算结果因式分解
print(summation(1/k**2,(k,1,oo)))  # 这里是两个小"o"表示正无穷
```

本地复现：第一行输出 `n**3/3 + n**2/2 + n/6`（**未自动通分**），第二行 `n*(n + 1)*(2*n + 1)/6`，第三行 `pi**2/6`。

> **为什么第一行"不像公式"**
> `summation` 返回的是**展开的多项式**，`factor` 才把它整理成教科书形式。这提示一条通用习惯：**SymPy 的结果先 `factor`/`simplify`/`together` 再看**，否则容易误判"算错了"。

### 4. 泰勒展开

**例 3.9（原书 p.94–95）** 写出 $\sin x$ 在 0 点处的 3、5、7 阶泰勒展开式，并在同一图形界面上画出 $\sin x$ 及上述各阶展开式在区间 $[0,2]$ 上的图形。

```python
# 程序文件 Pex3_9.py
from pylab import rc
from sympy import *
from sympy.plotting import *
rc('font',size=16); rc('text',usetex=True)
x=symbols('x'); y=sin(x)
for k in range(3,8,2): print(y.series(x,0,k))
                    # 等价于 print(series(y,x,0,k))
plot(y,series(y,x,0,3).removeO(),series(y,x,0,5).removeO(),
    series(y,x,0,7).removeO(),(x,0,2),xlabel='$x$',ylabel='$y$')
```

运行结果（原书 p.94）：

```
x + O(x**3)
x - x**3/6 + O(x**5)
x - x**3/6 + x**5/120 + O(x**7)
```

所画图形如图 3.3（原书 p.95）。

> **`series(y,x,0,k)` 的 `k` 是"截断阶"不是"项数"**
> `k=3` 得到到 $x^1$ 为止（余项 $O(x^3)$），即"展开到 3 阶、保留低于 3 次的项"。所以 `range(3,8,2)` 拿到的正是 1、3、5 次多项式，与题目"3、5、7 阶"对应。**`removeO()` 必须调用**，否则 `O(x**3)` 余项会让 `plot` 无法求值。

### 5. 不定积分和定积分

**例 3.10（原书 p.95）** 验证 $\displaystyle\int_0^{\pi}\sin(2x)\,dx=0$，$\displaystyle\int_0^{+\infty}\frac{\sin x}{x}\,dx=\frac{\pi}{2}$。

```python
# 程序文件 Pex3_10.py
from sympy import integrate, symbols, sin, pi, oo
x=symbols('x')
print(integrate(sin(2*x),(x,0,pi)))
print(integrate(sin(x)/x,(x,0,oo)))
```

本地复现：`0` 与 `pi/2`。

> **第二个积分值得多说一句**
> $\int_0^\infty \frac{\sin x}{x}dx$ 是**条件收敛**的反常积分，原函数不能用初等函数表示（$Si(x)$ 不是初等函数）。SymPy 能给出 $\pi/2$，靠的是符号积分规则而非"求原函数再代上下限"。**这正是符号计算的价值：它能绕开"找不到原函数"的死路。** 数值方法（3.5.2）对这个积分反而棘手——被积函数在 $x\to\infty$ 时振荡衰减，`quad` 直接积到无穷会失真。

### 6. 求解代数方程（方程组）的符号解

**例 3.11（原书 p.95）** 求如下代数方程：(1) $x^3=1$；(2) $(x-2)^2(x-1)^3=0$。

```python
# 程序文件 Pex3_11.py
from sympy import *
x,y=symbols('x  y')
print(solve(x**3-1,x))
print(solve((x-2)**2*(x-1)**3,x))
print(roots((x-2)**2*(x-1)**3,x))  #roots 可以得到根的重数信息
```

运行结果（原书 p.95）：

```
[1, -1/2 - sqrt(3)*I/2, -1/2 + sqrt(3)*I/2]
[1, 2]
{2: 2, 1: 3}
```

本地复现一致。

> **`solve` 丢重数，`roots` 保重数**
> 第 (2) 问有 5 个根（含重根），`solve` 只返回 `[1, 2]` 两个**不同**的根；`roots` 返回字典 `{2: 2, 1: 3}`，键是根、值是重数。**做因式分解、判稳定、算 Jordan 块时必须用 `roots`**，否则会把 5 次方程误当 2 个根。

**例 3.12（原书 p.95–96）** 求解如下代数方程组

$$
\begin{cases}x^2+y^2=1,\\ x-y=0.\end{cases}
$$


```python
# 程序文件 Pex3_12.py
from sympy.abc import x, y
from sympy import solve
s=solve([x**2+y**2-1, x-y], [x, y])
print("方程组的解为: ", s)
```

运行结果（原书 p.96）：

```
方程组的解为: [(-sqrt(2)/2, -sqrt(2)/2), (sqrt(2)/2, sqrt(2)/2)]
```

> **写法要点**
> 方程组写成**表达式列表**（左端移到右边等于 0 的形式），未知量写成**列表** `[x, y]`。返回的是**元组列表**，每个元组是一组解；顺序不保证与你列未知量的顺序之外的任何直觉一致，取用时按元组解包。

**例 3.13（原书 p.96）** 求函数 $f(x)=2x^3-5x^2+x$ 的驻点，并求函数在 $[0,1]$ 上的最大值。

```python
# 程序文件 Pex3_13.py
from sympy import *
x=symbols('x'); y=2*x**3-5*x**2+x
x0=solve(diff(y,x),x)   # 求驻点
print("驻点的精确解为",x0)
print("驻点的浮点数表示为: ",[x0[i].n() for i in range(len(x0))])
                # 列表中的符号数无法整体转换为浮点数
y0=[y.subs(x,0),y.subs(x,1),y.subs(x,x0[0]).n()]
                # 代入区间端点和一个驻点的值
print("三个点的函数值分别为:",y0)
```

运行结果（原书 p.96）：

```
驻点的精确解为 [-sqrt(19)/6 + 5/6, sqrt(19)/6 + 5/6]
驻点的浮点数表示为: [0.106850176076554, 1.55981649059011]
三个点的函数值分别为: [0, -2, 0.0522051838383851]
```

原书结论（p.96）：通过运行结果可以看出，第一个驻点 $x=\dfrac{-\sqrt{19}}{6}+\dfrac{5}{6}$ 在所考虑的区间内为最大点，对应的最大值为 0.0522。

> **这段代码示范了"符号 → 数值"的三级精度**
> ① `solve` 给**精确解**（含根号）；② `x0[i].n()` 给**浮点**（注意原书注释：列表里的符号数**不能整体** `.n()`，必须逐个转，这就是那行列表推导的用意）；③ 把端点与驻点代入 `subs` 后比较，才知道谁最大。**三步缺一：只给浮点会丢结构，只给精确解看不出大小。**
>
> 本地复现（SymPy 1.14）：驻点 $[5/6-\sqrt{19}/6,\ \sqrt{19}/6+5/6]=[0.10685,\ 1.55982]$；$f(0)=0$，$f(1)=-2$，$f(0.10685)=0.052205$，$f(1.55982)=-3.01517$。所以 $[0,1]$ 上的最大值确实在 $x=0.10685$，值 $0.0522$——原书只算了第一个驻点，**第二个驻点在区间外且是极小点**，这一点原书未点明，用二阶导可判：$f''(x)=12x-10$，在 $x=0.1069$ 处 $f''<0$（极大），在 $x=1.5598$ 处 $f''>0$（极小）。

### 7. 求解微分方程（方程组）的符号解

（原书 p.96–97）`dsolve` 求常微分方程的符号解。声明时可用 `Function()`，也可用 `symbols(..., cls=Function)`：

```python
>>> y=Function('y')
```
或者
```python
>>> y=symbols('y',cls=Function)
```

将符号变量声明为函数类型。

**例 3.14（原书 p.96–97）** 求下列微分方程的通解：(1) 齐次方程 $y''-5y'+6y=0$；(2) 非齐次方程 $y''-5y'+6y=xe^{2x}$。

```python
# 程序文件 Pex3_14.py
from sympy import *
x=symbols('x'); y=symbols('y',cls=Function)
eq1=diff(y(x),x,2)-5*diff(y(x),x)+6*y(x)
eq2=diff(y(x),x,2)-5*diff(y(x),x)+6*y(x)-x*exp(2*x)
print("齐次方程的解为: ",dsolve(eq1,y(x)))
print("非齐次方程的解为: ",dsolve(eq2,y(x)))
```

运行结果（原书 p.97）：

```
齐次方程的解为: Eq(y(x), (C1 + C2*exp(x))*exp(2*x))
非齐次方程的解为: Eq(y(x), (C1 + C2*exp(x) - x**2/2 - x)*exp(2*x))
```

即齐次方程的通解为

$$
y(x)=(c_1+c_2e^x)e^{2x};
$$


非齐次方程的通解为

$$
y(x)=\left(c_1+c_2e^x-\frac{x^2}{2}-x\right)e^{2x}.
$$


本地复现一致（SymPy 1.14）。

> **结果的"形"值得注意**
> 特征根是 2 和 3，标准写法应是 $c_1e^{2x}+c_2e^{3x}$；SymPy 给的 $(c_1+c_2e^x)e^{2x}$ **完全等价**，只是把 $e^{2x}$ 提出来了。遇到"答案长得不一样"先别慌，`simplify` 或 `expand` 后再比。
>
> 用待定系数法可验证非齐次特解：设 $y_p=x(ax+b)e^{2x}$，代回得 $a=-\frac12$、$b=-1$，与 SymPy 的 $-\frac{x^2}{2}-x$ 一致。

**例 3.15（原书 p.97）** 求下列微分方程的解：(1) 初值问题 $y''-5y'+6y=0$，$y(0)=1$，$y'(0)=0$；(2) 边值问题 $y''-5y'+6y=xe^{2x}$，$y(0)=1$，$y(2)=0$。原书把第（2）问称为初值问题，两个条件实际给在不同位置，属于边值问题。

```python
# 程序文件 Pex3_15.py
from sympy import *
x=symbols('x'); y=symbols('y',cls=Function)
eq1=diff(y(x),x,2)-5*diff(y(x),x)+6*y(x)
eq2=diff(y(x),x,2)-5*diff(y(x),x)+6*y(x)-x*exp(2*x)
print("初值问题的解为: {}".format(dsolve(eq1,y(x),ics={y(0):1,
    diff(y(x),x).subs(x,0):0})))
y2=dsolve(eq2,y(x),ics={y(0):1,y(2):0})
print("边值问题的解为: {}".format(y2))
```

运行结果（原书 p.97）：

```
初值问题的解为: Eq(y(x), (-2*exp(x) + 3)*exp(2*x))
边值问题的解为: Eq(y(x), (-x**2/2 - x - 3*exp(x)/(-exp(2) + 1)+
    (-exp(2) + 4)/(-exp(2) + 1))*exp(2*x))
```

本地复现一致。

> **初值条件怎么写成"导数"**
> `ics` 字典的键必须是方程/函数值：函数值写 `y(0):1`，**导数值要写 `diff(y(x),x).subs(x,0):0`**——即"先把导数表达式取出，再代入 0"，不能写 `y'(0)`（Python 没有这个语法）。这是 `dsolve` 初值问题最常见的卡点。

---

## 3.5 高等数学问题的数值解

> 原书 p.98 节首语：大多数实际问题**无法求符号解**，只能求数值解，即近似解。本节介绍调用 SciPy 工具库求数值解，对其中一些问题我们自己设计 Python 程序。

### 3.5.1 泰勒级数与数值导数

#### 1. 泰勒级数

$\sin x$ 的泰勒级数展开式为

$$
\sin x=\sum_{k=0}^{\infty}\frac{(-1)^kx^{2k+1}}{(2k+1)!},\quad x\in(-\infty,\infty).
$$


**例 3.16（原书 p.98–99）** 画出 $\sin x$ 及它在 0 点处的 1、3、5 阶泰勒展开式在 $x\in[-2\pi,2\pi]$ 时的图形。

编写函数 `mysin` 求 $f(x)=\sin x$ 的近似值，调用自定义函数 `mysin` 画泰勒展开式的图形：

```python
# 程序文件 Pex3_16.py
import numpy as np
import matplotlib.pyplot as plt
def fac(n): return (1 if n<1 else n*fac(n-1))
def item(n,x): return (-1)**n*x**(2*n+1)/fac(2*n+1)
def mysin(n,x): return (0 if n<0 else mysin(n-1,x)+item(n,x))
x=np.linspace(-2*np.pi,2*np.pi,101)
plt.plot(x,np.sin(x),'*-')
str=['v-','H--','-.']
for n in [1,2,3]: plt.plot(x,mysin(2*n-1,x),str[n-1])
plt.legend(['sin','n=1','n=3','n=5'])
plt.savefig('figure3_16.png',dpi=500); plt.show()
```

所画的图形如图 3.4（原书 p.99）。

> **这段代码有三个"教科书级"的设计**
> ① **递归定义 `mysin`**：`mysin(n,x) = mysin(n-1,x) + item(n,x)`，把"部分和"写成递归，天然对应 $\sum_{k=0}^{n}$；② **`fac` 与 `item` 分离**：阶乘与通项各自成函数，便于单独复用与检查；③ **循环 `for n in [1,2,3]` 配 `mysin(2*n-1,x)`**：把"第 $n$ 条曲线"映射到"$2n-1$ 阶"，避免了手写三个变量。
>
> 本地复现：`mysin(5,1)=0.841470984648068`，`np.sin(1)=0.8414709848078965`，绝对误差约 $1.6\times10^{-10}$——**5 阶展开在 $x=1$ 已相当准**。
>
> 图 3.4 的视觉结论更重要：**在 $[-\pi,\pi]$ 内低阶展开贴合，出了这个区间迅速发散**（$n=1$ 的直线、$n=3$ 的三次曲线都在远处飙到 ±30）。这是"泰勒多项式只有局部有效性"的最好图示。

#### 2. 数值导数

利用泰勒级数可给出近似计算函数导数的方法。若 $f(x)$ 存在一阶导数，由泰勒级数

$$
f(x+\Delta x)=f(x)+f'(x)\Delta x+o(\Delta x),
$$


移项并舍弃高阶无穷小，得

$$
f'(x)\approx\frac{f(x+\Delta x)-f(x)}{\Delta x},\tag{3.1}
$$


这是常用的估计一阶导数的计算公式，具有**一阶精度**。此外还可推出具有**二阶精度**的估计公式

$$
f'(x)\approx\frac{f(x+\Delta x)-f(x-\Delta x)}{2\Delta x}.\tag{3.2}
$$


当函数具有更高阶导数时，利用

$$
f(x+\Delta x)=f(x)+f'(x)\Delta x+\frac{f''(x)}{2!}(\Delta x)^2+o((\Delta x)^2)
$$


以及

$$
f(x-\Delta x)=f(x)-f'(x)\Delta x+\frac{f''(x)}{2!}(\Delta x)^2+o((\Delta x)^2)
$$


可得二阶导数的计算公式

$$
f''(x)\approx\frac{f(x+\Delta x)-2f(x)+f(x-\Delta x)}{(\Delta x)^2}.\tag{3.3}
$$


> **补充：三个公式的精度阶**
> (3.1) 是**前向差分**，误差 $O(\Delta x)$；(3.2) 是**中心差分**，误差 $O((\Delta x)^2)$；(3.3) 是**二阶中心差分**，误差也是 $O((\Delta x)^2)$。中心差分虽然"更准"，但**步长不能太小**——$\Delta x$ 小到 $10^{-8}$ 量级时，$f(x+\Delta x)-f(x-\Delta x)$ 的有效数字被减法吃掉，舍入误差反而主导（这就是例 3.21 里 `dx=1E-8` 取值的原因，也是不能取更小的原因）。

**例 3.17（原书 p.99–101）** 甲、乙、丙、丁 4 个人分别位于起始位置 $(-200,200)$，$(200,200)$，$(200,-200)$ 以及 $(-200,-200)$ 处（单位：m），并且以恒定的速率 1m/s 行走。在行走过程中，甲始终朝向乙的当前位置；同样，乙朝向丙、丙朝向丁、丁朝向甲。试绘制 4 人行走过程的近似轨迹。

**分析（原书 p.100）**：运动学中速度是位移相对于时间的导数，即 $v(t)=\dfrac{d}{dt}r(t)$，因此在一段很短的时间 $\Delta t$ 内近似有

$$
r(t+\Delta t)\approx r(t)+v(t)\cdot\Delta t.
$$


又由于位移、速度均是矢量，因此在 $xOy$ 平面内又有

$$
\begin{cases}r_x(t+\Delta t)\approx r_x(t)+v(t)\cdot\Delta t\cdot\cos\theta(t),\\[2mm] r_y(t+\Delta t)\approx r_y(t)+v(t)\cdot\Delta t\cdot\sin\theta(t),\end{cases}\tag{3.4}
$$


其中 $\theta(t)$ 是 $t$ 时刻与 $x$ 轴正向的夹角。

以两个二维数组 `xy`、`xyn` 分别存储 4 个人的当前位置和下一时刻的位置，第 $i$ 个人的当前位置为 `xy[i]`、下一时刻位置为 `xyn[i]`，$i$ 取 0,1,2,3 时分别对应甲、乙、丙、丁。下面语句

```python
j=(i+1)%4; dxy=xy[j]-xy[i]
dd=dxy/ng.norm(dxy)   # 单位化向量
```

完成对夹角余弦值、正弦值的计算。二维数组 `Txy` 存 4 个人的所有位置信息，其中 `Txy[i]` 存放第 $i$ 个人所有时刻的位置信息。

```python
# 程序文件 Pex3_17.py
import numpy as np, numpy.linalg as ng
import matplotlib.pyplot as plt
N=4; v=1.0; d=200.0; time=400.0; divs=201
xy=np.array([[-d,d],[d,d],[d,-d],[-d,-d]])
T=np.linspace(0,time,divs); dt=T[1]-T[0]
xyn=np.empty((4,2)); Txy=xy
for n in range(1,len(T)):
    for i in [0,1,2,3]:
        j=(i+1)%4; dxy=xy[j]-xy[i]
        dd=dxy/ng.norm(dxy)   # 单位化向量
        xyn[i]=xy[i]+v*dt*dd;  # 计算下一步的位置
    Txy=np.c_[Txy,xyn]; xy=xyn.copy()
for i in range(N): plt.plot(Txy[i,::2],Txy[i,1::2])
plt.savefig("figure3_17.png",dpi=500); plt.show()
```

程序的运行结果如图 3.5（原书 p.101）。原书补充：**可以用二分法，通过改变 `time` 变量的值，来估计 4 人"汇聚"在中心点时所需要的时间。**

> **这段代码的三处巧思**
> ① `j=(i+1)%4` 实现"环状追赶"：丁追甲靠取模闭合，省掉 if 判断；② `dd=dxy/ng.norm(dxy)` 把"朝向对方"化归为**单位向量**，于是 $v\cdot\Delta t\cdot dd$ 直接就是位移增量（这就是式 (3.4) 的实现，只是用向量代替了 $\cos\theta,\sin\theta$）；③ `Txy=np.c_[Txy,xyn]` 沿列拼接，把每步的 4×2 位置追加成 4×402 的大矩阵，最后 `Txy[i,::2]` 取 $x$、`Txy[i,1::2]` 取 $y$ ——**一次存完、一次画完**，避免在循环里反复绘图。
>
> 该模型是经典的"**追击问题（pursuit curve）**"，四人轨迹是四条相互缠绕的对数螺线，最终在原点汇聚。原书提到的"二分法估时间"是个很好的延伸：把 `time` 当参数，观察轨迹末端是否还在动，二分逼近即可。

### 3.5.2 数值积分

#### 1. 一重积分

（原书 p.101）实际中利用牛顿-莱布尼兹公式，通过求原函数计算定积分

$$
\int_a^b f(x)dx=F(x)\big|_a^b=F(b)-F(a)
$$


是非常困难的，这里 $F(x)$ 为 $f(x)$ 的一个原函数。然而我们知道，当一元函数 $f(x)$ 在区间 $[a,b]$ 上**不变号**时，其定积分的值恰好等于 $f(x)$ 与直线 $x=a$、$x=b$ 以及 $x$ 轴所围成的曲边梯形的"**有向面积**"。

**梯形法**的思想：把大的曲边梯形分成多个小的曲边梯形，每个小曲边梯形的面积用一个梯形面积作近似，最后累加求和得到所求定积分的数值解。

使用梯形公式时，把整个区间 $[a,b]$ 进行 $n$ 等分（此时步长 $h=(b-a)/n$），分点为 $x_i\ (i=0,1,\cdots,n)$，对应的函数值 $f_i=f(x_i)$，这里 $x_i=a+i\cdot h$，$i=0,1,\cdots,n$。积分 $\int_a^b f(x)dx$ 的数值解

$$
I_1=\frac{h}{2}\left(f_0+2\sum_{i=1}^{n-1}f_i+f_n\right).\tag{3.5}
$$


使用**辛普森公式**时，将区间 $[a,b]$ 进行 $2n$ 等分，步长 $h=\dfrac{b-a}{2n}$，分点 $x_i=a+i\cdot h\ (i=0,1,\cdots,2n)$，对应的函数值 $f_i=f(x_i)$。积分 $\int_a^b f(x)dx$ 的数值解

$$
I_2=\frac{h}{3}\left[f_0+2\sum_{i=1}^{n-1}f_{2i}+4\sum_{i=1}^{n}f_{2i-1}+f_{2n}\right].\tag{3.6}
$$


> **补充：两个公式的代数精度**
> 梯形公式对**一次**多项式精确（代数精度 1），误差 $-\dfrac{(b-a)^3}{12n^2}f''(\xi)$；辛普森公式对**三次**多项式精确（代数精度 3），误差 $-\dfrac{(b-a)^5}{2880n^4}f^{(4)}(\xi)$。所以 $n$ 翻倍时，梯形误差降 4 倍、辛普森降 16 倍——例 3.18 的结果差距（$1.3\times10^{-8}$ vs $10^{-16}$）正是这条阶数关系的直接体现。

**例 3.18（原书 p.102）** 分别使用梯形公式、辛普森公式和 SciPy 工具库中函数 `quad` 求定积分

$$
\int_0^1\sin\left(\sqrt{\cos x+x^2}\right)dx
$$


的数值解。

```python
# 程序文件 Pex3_18.py
import numpy as np
from scipy.integrate import quad
def trapezoid(f,n,a,b):     # 定义梯形公式的函数
    xi=np.linspace(a,b,n); h=(b-a)/(n-1)
    return h*(np.sum(f(xi))-(f(a)+f(b))/2)
def simpson(f,n,a,b):       # 定义辛普森公式的函数
    xi, h=np.linspace(a,b,2*n+1), (b-a)/(2.0*n)
    xe=[f(xi[i]) for i in range(len(xi)) if i%2==0]
    xo=[f(xi[i]) for i in range(len(xi)) if i%2!=0]
    return h*(2*np.sum(xe)+4*np.sum(xo)-f(a)-f(b))/3.0
a=0; b=1; n=1000
f=lambda x: np.sin(np.sqrt(np.cos(x)+x**2))
print("梯形积分I1=",trapezoid(f,n,a,b))
print("辛普森积分I2=",simpson(f,n,a,b))
print("SciPy积分I3=",quad(f,a,b))
```

运行结果（原书 p.102）：

```
梯形积分I1= 0.8803354297105352
辛普森积分I2= 0.8803354170924643
SciPy积分I3= (0.8803354170924643, 9.773686494490445e-15)
```

> **`quad` 返回的是**元组****
> `(积分值, 绝对误差估计)`——第二个数 $9.77\times10^{-15}$ 是算法自报的误差上界。**这就是"结果检查"的抓手**：看到误差估计与积分值同量级，说明被积函数在该区间有问题（振荡、奇点、不可导点），必须警惕。
>
> **本地复现（不含 SciPy，用 400 点 Gauss-Legendre 作基准）**：
> - 基准值 $=0.8803354170924642$
> - 梯形 $n=1000$：$0.8803354297105352$，误差 $1.26\times10^{-8}$
> - 辛普森 $n=1000$：$0.8803354170924643$，误差 $1.1\times10^{-16}$
>
> **梯形与辛普森的结果与原书逐位一致**，`quad` 的值也与辛普森完全相同——说明原书结果可信，且辛普森在本例已达到双精度极限。
>
> 代码细节：`trapezoid` 里 `xi=linspace(a,b,n)` 取 $n$ 个点、步长 `h=(b-a)/(n-1)`，然后 `sum - (f(a)+f(b))/2` 实际实现了 $\frac{h}{2}[f_0+2\sum f_i+f_n]$（把首末各减一半）；`simpson` 里 `2*np.sum(xe)-f(a)-f(b)` 是把"偶数点"的系数 2 里，首末两点多余的一份减掉，从而得到式 (3.6) 的 $f_0+f_{2n}+2\sum_{i=1}^{n-1}f_{2i}$。**这两处"减掉首末"的写法，是本节最值得抄的两行技巧。**

#### 2. 多重积分

（原书 p.102–104）多重积分用 `dblquad`、`tplquad` 直接求数值解。

`dblquad` 调用格式：

```python
dblquad(func, a, b, gfun, hfun, args=(), epsabs=1.49e-08, epsrel=
    1.49e-08)
```

其中被积函数 `func` 的格式为 `func(y, x)`，**最外层 $x$ 的积分区间为 $[a,b]$，内层 $y$ 的积分区间为 `[gfun(x), hfun(x)]`**。

`tplquad` 调用格式：

```python
tplquad(func, a, b, gfun, hfun, qfun, rfun, args=(), epsabs=1.49
    e-08, epsrel=1.49e-08)
```

其中被积函数 `func` 的格式为 `func(z, y, x)`，**最外层 $x$ 的积分区间为 $[a,b]$，中间层 $y$ 的积分区间为 `[gfun(x), hfun(x)]`，最内层 $z$ 的积分区间为 `[qfun(x,y), rfun(x,y)]`**。

**例 3.19（原书 p.103）** 分别求下列积分的数值解。

$$
(1)\ \int_0^2dx\int_0^1xy^2dy;\qquad (2)\ I=\iint_{x^2+y^2\leqslant1}e^{-\frac{x^2}{2}}\sin(x^2+y)\,dxdy.
$$


对于 (2) 中的二重积分，先要化成累次积分

$$
I=\int_{-1}^{1}dx\int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}}e^{-\frac{x^2}{2}}\sin(x^2+y)\,dy.
$$


```python
# 程序文件 Pex3_19.py
import numpy as np
from scipy.integrate import dblquad
f1=lambda y, x: x*y**2   # 第一个被积函数
print("I1: ",dblquad(f1, 0, 2, 0, 1))
f2=lambda y, x: np.exp(-x**2/2)*np.sin(x**2+y)
bd=lambda x: np.sqrt(1-x**2)
print("I2:",dblquad(f2, -1, 1, lambda x: -bd(x), bd))
```

运行结果（原书 p.103）：

```
I1: (0.6666666666666667, 7.401486830834377e-15)
I2: (0.5368603826989582, 3.696155159715886e-09)
```

即第一个积分值为 0.6667，第二个积分值为 0.5369。

> **参数顺序是 `func(y, x)`，不是 `func(x, y)`**
> 这是 `dblquad` 最容易错的地方：**因变量在前、自变量在后**（与数学写法 $\int f(x,y)dy$ 的阅读顺序相反）。若写反，程序不报错，只是**结果错**（因为 $x,y$ 的对称性或定义域不同）。同理 `tplquad` 要写 `func(z, y, x)`。
>
> 本地复现：$I_1=2/3=0.666667$（与解析值一致），$I_2\approx0.53686$（用 300 点 Gauss-Legendre 得 $0.53686041$，与 `quad` 的 $0.53686038$ 相符到 $10^{-7}$）。

**例 3.20（原书 p.103–104）** 计算

$$
\iiint_{\Omega}z\sqrt{x^2+y^2+1}\,dxdydz,
$$


其中 $\Omega$ 为柱面 $x^2+y^2-2x=0$ 与 $z=0$，$z=6$ 两平面所围成的空间区域。

先把三重积分化成累次积分

$$
I=\int_0^2dx\int_{-\sqrt{2x-x^2}}^{\sqrt{2x-x^2}}dy\int_0^6 z\sqrt{x^2+y^2+1}\,dz.
$$


```python
# 程序文件 Pex3_20.py
import numpy as np
from scipy.integrate import tplquad
f=lambda z, y, x: z*np.sqrt(x**2+y**2+1)
ybd=lambda x: np.sqrt(2*x-x**2)
print("I=",tplquad(f, 0, 2, lambda x: -ybd(x),ybd, 0, 6))
```

求得积分值为 87.4502（原书 p.104）。

> **注 3.2（原书 p.104）**
> 上述三重积分中，被积函数的定义**必须严格按照积分次序书写匿名函数的自变量顺序**，如积分顺序为先对 $z$ 积分、再对 $y$ 积分、最后对 $x$ 积分，则被积函数的匿名函数中定义函数的写法为 `f(z, y, x)`，**不能写成 `f(x, y, z)` 等其他写法**。

> **本地复核**
> 用 300 点 Gauss-Legendre 三重求积（$x$ 外、$y$ 中、$z$ 内，$y$ 界取 $\pm\sqrt{2x-x^2}$）得 $I=87.45019956$，与原书 87.4502 一致。**注意 $x$ 的积分上限是 2**（柱面 $x^2+y^2=2x$ 即 $(x-1)^2+y^2=1$，全在 $x\in[0,2]$ 内），这是"先画区域再定限"的典型：柱面投影到 $xOy$ 面是圆心 $(1,0)$、半径 1 的圆。

### 3.5.3 非线性方程（组）数值解

（原书 p.104–107）方程求解一直是数学中的核心问题之一。然而，即使是形如

$$
\sum_{i=0}^{n}a_ix^i=0
$$


这样的代数方程，当 $n\geqslant5$ 时也没有统一的求根公式。实际应用中，方程的数值解往往就可以满足工程及计算需要。本节介绍两种较常用的方法：**二分法、牛顿迭代法**，读者需要了解这些方法的使用条件。

#### 1. 二分法求根

若 $f(x)\in C[a,b]$（$[a,b]$ 上的连续函数）且 $f(a)f(b)<0$，则由介值定理，存在 $c\in[a,b]$ 使得 $f(c)=0$。此时可用二分法对方程求根：

1. 令 $a_0=a$，$b_0=b$，$n=0$；
2. 令 $c_n=(a_n+b_n)/2$；
3. 若 $|f(c_n)|<\varepsilon$，则算法停止，输出 $c_n$；
4. 若 $f(a_n)f(c_n)<0$，则 $a_{n+1}\leftarrow a_n$，$b_{n+1}\leftarrow c_n$；否则 $a_{n+1}\leftarrow c_n$，$b_{n+1}\leftarrow b_n$；
5. $n\leftarrow n+1$，转至 2。

采用二分法求根时，第 $n$ 次迭代对应的区间长度为 $(b-a)/2^n$，**收敛速度是较快的**（线性收敛，每步误差减半）。

#### 2. 牛顿迭代法求根

若 $f(x)\in C^2[a,b]$（$[a,b]$ 上的二阶连续可微函数），$f(a)f(b)<0$ 且 $f'(x)$ 在 $[a,b]$ 上不变号，则方程 $f(x)=0$ 在 $[a,b]$ 内必然存在某个根 $x^*$。设 $x_0$ 是 $x^*$ 附近的点，则根据泰勒展开式有

$$
0=f(x^*)=f(x_0)+f'(x_0)(x^*-x_0)+\frac{f''(\xi_0)}{2}(x^*-x_0)^2.\tag{3.7}
$$


令 $x_1=x_0-\dfrac{f(x_0)}{f'(x_0)}$，那么

$$
x^*-x_1=x^*-x_0+\frac{f(x_0)}{f'(x_0)}
\overset{(3.7)}{=}\frac{-f(x_0)-\dfrac{f''(\xi_0)}{2}(x^*-x_0)^2}{f'(x_0)}+\frac{f(x_0)}{f'(x_0)}
=-\frac{f''(\xi_0)}{2f'(x_0)}(x^*-x_0)^2,
$$


即

$$
\frac{x^*-x_1}{(x^*-x_0)^2}=-\frac{f''(\xi_0)}{2f'(x_0)}.
$$


同样，对每个 $i$，若令

$$
x_{i+1}=x_i-\frac{f(x_i)}{f'(x_i)},\tag{3.8}
$$


则有

$$
\frac{x^*-x_{i+1}}{(x^*-x_i)^2}=-\frac{f''(\xi_i)}{2f'(x_i)}.
$$


若存在 $M=\max\limits_{x\in[a,b]}|f''(x)|\Big/\min\limits_{x\in[a,b]}|f'(x)|$，则

$$
\frac{|x^*-x_{i+1}|}{|x^*-x_i|}\leqslant\frac{M}{2}|x^*-x_i|,
$$


这说明该序列能够以较快的速度**收敛于 $x^*$**。该方法称为牛顿迭代法（**平方收敛**）。

#### 3. 用 SciPy 工具库求解非线性方程（方程组）

**例 3.21（原书 p.105–106）** 求方程 $x^3+1.1x^2+0.9x-1.4=0$ 实根的近似值，使误差不超过 $10^{-6}$。要求用三种方法：① 二分法；② 牛顿迭代法；③ 直接调用 SciPy 工具库求解。

可以验证方程在区间 $(0,1)$ 上有一个零点。我们自己编写了二分法和牛顿迭代法的函数：

```python
# 程序文件 Pex3_21.py
import numpy as np
from scipy.optimize import fsolve
def binary_search(f, eps, a, b):  # 二分法函数
    c=(a+b)/2
    while np.abs(f(c))>eps:
        if f(a)*f(c)<0: b=c
        else: a=c
        c=(a+b)/2
    return c
def newton_iter(f, eps, x0, dx=1E-8):  # 牛顿迭代法函数
    def diff(f, dx=dx):   # 求数值导数函数
        return lambda x: (f(x+dx)-f(x-dx))/(2*dx)
    df=diff(f,dx)
    x1=x0-f(x0)/df(x0)
    while np.abs(x1-x0)>=eps:
        x1, x0=x1-f(x1)/df(x1), x1
    return x1
f=lambda x: x**3+1.1*x**2+0.9*x-1.4
print("二分法求得的根为: ", binary_search(f,1E-6,0,1))
print("牛顿迭代法求得的根为: ",newton_iter(f,1E-6,0))
print("直接调用SciPy求得的根为: ",fsolve(f,0))
```

运行结果（原书 p.106）：

```
二分法求得的根为:  0.6706571578979492
牛顿迭代法求得的根为:  0.6706573107258097
直接调用SciPy求得的根为:  [0.67065731]
```

> **三种方法的"结果检查"各看什么**
> 1. **二分法**：收敛准则是 $|f(c)|<\varepsilon$，因此它的"精度"是**函数值**意义下的，不是根的精度。区间长度 $1/2^n<\varepsilon$ 也被二分次数约束——本例 20 次左右到 $10^{-6}$。
> 2. **牛顿法**：收敛准则是 $|x_1-x_0|<\varepsilon$，是**根**意义下的；导数用中心差分 `(f(x+dx)-f(x-dx))/(2*dx)` 近似（对应式 (3.2)），`dx=1E-8` 是精度与舍入的折中。
> 3. **`fsolve`**：返回**数组**（`[0.67065731]`，只印 8 位），要看更多位需 `print("%.15f"%fsolve(...)[0])`。**必做检查是把结果代回 $f$，看残差是否接近 0。**
>
> 本地复现（不用 SciPy）：二分得 `0.6706571578979492`、牛顿得 `0.6706573107258097`，**与原书逐位相同**；`np.roots([1,1.1,0.9,-1.4])` 给复根对 `-0.885329±1.141796i` 与实根 `0.67065731`，可确认方程另有两个复根（原书只求实根，未提这一点）。

#### 4. 用 `fsolve` 求非线性方程组的数值解

**例 3.22（原书 p.106）** 求下列非线性方程组的数值解

$$
\begin{cases}5x_2+3=0,\\ 4x_1^2-2\sin(x_2x_3)=0,\\ x_2x_3-1.5=0.\end{cases}
$$


```python
# 程序文件 Pex3_22_1.py
from numpy import sin
from scipy.optimize import fsolve
f=lambda x: [5*x[1]+3, 4*x[0]**2-2*sin(x[1]*x[2]), x[1]*x[2]-1.5]
print("result=",fsolve(f, [1.0, 1.0, 1.0]))
```

运行结果（原书 p.106）：

```
result= [-0.70622057 -0.6        -2.5       ]
```

上面程序中使用的是匿名函数，但 Python 的**下标从 0 开始**，不太方便。下面利用函数定义方程组（原书 p.107）：

```python
# 程序文件 Pex3_22_2.py
from numpy import sin
from scipy.optimize import fsolve
def Pfun(x):
    x1,x2,x3=x.tolist()  # 转换成列表
    return 5*x2+3, 4*x1**2-2*sin(x2*x3), x2*x3-1.5
print("result=",fsolve(Pfun, [1.0, 1.0, 1.0]))
```

> **`x.tolist()` 解包是"给数学写法让路"**
> `fsolve` 传进来的是 ndarray，`x1,x2,x3=x.tolist()` 一行就把它变成"数学下标从 1 开始"的三个变量，后面 `5*x2+3` 可以直接照着方程抄。**这个技巧在处理 $n$ 个方程的建模题时非常值钱**，比 `x[0],x[1],x[2]` 可读得多。
>
> **结果检查（本地复核）**：把 $(-0.70622057,\,-0.6,\,-2.5)$ 代回三式，残差分别为 $5(-0.6)+3=0$、$4x_1^2-2\sin(x_2x_3)\approx7.6\times10^{-10}$、$x_2x_3-1.5=0$——**三个方程全部满足**。还可发现解的结构：由第 1 式直接得 $x_2=-0.6$，由第 3 式得 $x_3=1.5/(-0.6)=-2.5$，代回第 2 式解 $x_1$，得 $x_1=\pm0.70622$。`fsolve` 从 $(1,1,1)$ 出发收敛到**负根**——**换初值会得到另一个解**，这是非线性方程组"解不唯一、结果依赖初值"的标准示例。

### 3.5.4 函数极值点的数值解

（原书 p.107–108）求函数极值点的算法就不介绍了，下面给出利用 SciPy 库函数求极值点的例子。

#### 1. 一元函数的极值点

**例 3.23（原书 p.107）** 求函数 $f(x)=e^x\cos(2x)$ 在区间 $[0,3]$ 上的极小点。

```python
# 程序文件 Pex3_23.py
from numpy import exp,cos
from scipy.optimize import fminbound
f=lambda x: exp(x)*cos(2*x)
x0=fminbound(f,0,3)
print("极小点为: {}, 极小值为: {}".format(x0,f(x0)))
```

运行结果（原书 p.107）：

```
极小点为: 1.8026199149262752, 极小值为: -5.425165227463772
```

**例 3.24（原书 p.107，续例 3.23）** 求函数 $f(x)=e^x\cos(2x)$ 在 0 附近的一个极小点。

```python
# 程序文件 Pex3_24.py
from numpy import exp,cos
from scipy.optimize import fmin
f=lambda x: exp(x)*cos(2*x)
x0=fmin(f,0)
print("极小点为: {}, 极小值为: {}".format(x0,f(x0)))
```

> **这一例原书**没有印出运行结果**，但它是最有教学价值的一例**
> `fminbound(f,0,3)` 是**有界**搜索，给出区间内的全局最小点 $1.80262$；`fmin(f,0)` 是**无约束局部**搜索，只给"从 0 出发能走到的最小点"。
>
> 由于 $f'(x)=e^x(\cos 2x-2\sin 2x)$，令其为 0 得 $\tan 2x=\frac12$，即 $x=0.2318+\frac{k\pi}{2}$。其中**极小点**在 $x=0.2318-\frac{\pi}{2}=-1.3390$ 与 $x=0.2318+\frac{\pi}{2}=1.8026$ 处。所以从 $x_0=0$ 出发会向左滑到 $-1.3390$，得 $f=-0.2344$——**这是个局部极小，不是全局最小**。
>
> 本地以 Nelder-Mead 一维实现（模拟 `fmin` 从 0 出发，初始单纯形步长 $2.5\times10^{-4}$）复现：收敛到 $x=-1.3390$，$f=-0.23444$。用 $4\times10^5$ 点密扫确认局部极小只有两处：$(-1.3390,-0.2344)$ 与 $(1.8026,-5.4252)$。
>
> **结论：`fmin` 给局部解、`fminbound` 给区间内全局解；"求极值"一定要同时报告"在哪个区间/从哪个初值出发"，否则结果无法解释。** 这也是原书把两例并排给出的用意。

#### 2. 多元函数的极值点

（原书 p.107–108）`scipy.optimize` 模块下的 `minimize` 函数求多元函数的极小点和极小值，基本调用格式

```python
minimize(fun, x0, args=(), method=None)
```

其中 `method` 表示使用的算法，取值可为：

`'Nelder-Mead'`、`'Powell'`、`'CG'`/`'BFGS'`、`'Newton-CG'`、`'L-BFGS-B'`、`'TNC'`、`'COBYLA'`、`'SLSQP'`、`'trust-constr'`、`'dogleg'`、`'trust-ncg'`、`'trust-exact'`、`'trust-krylov'`。

**例 3.25（原书 p.108）** 求函数 $f(x)=100(x_2-x_1^2)^2+(1-x_1)^2$ 的极小值。

```python
# 程序文件 Pex3_25.py
from scipy.optimize import minimize
f=lambda x: 100*(x[1]-x[0]**2)**2+(1-x[0])**2
x0=minimize(f,[2.0, 2.0])
print("极小点为: {}, 极小值为: {}".format(x0.x,x0.fun))
```

运行结果（原书 p.108）：

```
极小点为: [0.99999565 0.99999129], 极小值为: 1.8932820837847567e-11
```

> **这是 Rosenbrock 函数（香蕉函数）**
> $f(x_1,x_2)=100(x_2-x_1^2)^2+(1-x_1)^2$ 是优化算法的经典测试函数：全局最小点 $(1,1)$、最小值 $0$，但最优点落在一条**狭长弯曲的"香蕉谷"**底部，梯度法容易在谷底来回震荡。
>
> **结果检查三件事**：
> 1. **返回值是对象**，不是数值：`x0.x` 是最优点（数组）、`x0.fun` 是目标值、`x0.success` 是否成功、`x0.nit` 迭代次数——原书只印了前两个，实际工程必须检查 `success`。
> 2. **数值是"近似 1"而非 1**：`[0.99999565, 0.99999129]`，目标值 $1.89\times10^{-11}$ 而非 0。这说明默认容差下算法在 $(1,1)$ 附近停住，**不要写成"最优点为 (1,1)"，要写"约为 (1.0000, 1.0000)"**。
> 3. **本地复核**：把原书答案代回，$f=1.8933\times10^{-11}$，与 `x0.fun` 一致；$f(1,1)=0$ 精确成立。若初值改为 $[-2,2]$ 或加大 `tol`，结果会漂移——**初值敏感性是多元优化的固有属性**。

> **关于 `method` 的默认值**
> 原书列了 14 种算法。`method=None` 时，`minimize` 对无约束且无边界的问题选 BFGS，未提供梯度时用数值差分。仅有变量边界时选 L-BFGS-B，有一般约束时选 SLSQP。对比算法时应显式指定 `method`。

## 3.6 线性代数问题的符号解和数值解

原书 p.108–119。3.6 下设三小节：符号解（3.6.1）、数值解（3.6.2）、超定方程组的最小二乘解（3.6.3）。

### 3.6.1 线性代数问题的符号解（p.108–112）

**定位。** 符号解把矩阵元素当作“数”而不是“浮点数”来处理：用 `Rational(1, 3)` 构造精确的 $1/3$，可避免 Python 先把 `1/3` 算成浮点数；判断秩、判断行列式是否为零，都是精确判断；含参数的矩阵也能带着参数往下算。代价是规模一大就慢，而且很多工程问题本来只要 6 位有效数字的答案。

原书给出的能力清单（p.108）：求行列式、构造特殊矩阵、求特征值与特征向量、转置与逆、删除选中的行和列；`eye`、`zeros`、`ones` 用来快速造特殊矩阵；`+`、`-`、`*`、`**` 都可用于矩阵。**在符号矩阵运算中，`*` 表示矩阵乘积，`**` 表示矩阵的幂运算**——这一条是本节最容易被误用的地方。

#### 1. 矩阵的运算（p.108–110）

三种建矩阵的写法：

```python
import sympy as sp
import numpy as np

A = sp.Matrix([[1], [2], [3]])            # 3×1 列向量
B = sp.Matrix([[4, 5, 6]])                # 1×3 行向量
C = sp.Matrix(np.arange(1, 17).reshape(4, 4))   # 由 ndarray 转入，仍是精确整数
E = sp.eye(3)                              # 单位阵
```

常用操作与返回类型（本节例题里都会出现）：

| 操作 | 写法 | 说明 |
|---|---|---|
| 2-范数 | `A.norm()` | 向量长度 $\sqrt{\sum a_i^2}$；符号形式返回 `sqrt(14)` |
| 浮点化 | `A.norm().evalf()` | 转成浮点数 |
| 转置 | `A.T` 或 `A.transpose()` | 返回新矩阵，不原地改 |
| 点乘（内积） | `A.dot(B)` | 要求维数匹配 |
| 叉乘 | `A.cross(B)` | 三维向量专用 |
| 行列式 | `sp.det(A)` | 精确值 |
| 秩 | `A.rank()` | 精确秩 |
| 逆 | `A.inv()` | 奇异时报错 |
| 幂 | `A**2` | 矩阵幂（不是元素平方） |
| 横拼／纵拼 | `A.row_join(B)`、`A.col_join(B)` | 分块矩阵的基本功 |
| 子块 | `A[0:2, 0:2]` | 切片取左上角块 |
| 删行／删列 | `A.row_del(3)`、`A.col_del(0)` | 原地修改，先用 `A.copy()` 保护原矩阵 |

> 注 3.3（原书 p.109）：要看某个方法怎么用，直接 `help(Matrix)`，比翻文档快。

#### 例 3.26（原书 p.108–109）向量的模、转置、点乘与叉乘

**问题与数据。** 已知 $\boldsymbol\alpha=[1,2,3]^{\mathrm T}$，$\boldsymbol\beta=[4,5,6]^{\mathrm T}$，求 $\|\boldsymbol\alpha\|_2$、$\boldsymbol\alpha^{\mathrm T}$、$\boldsymbol\alpha\cdot\boldsymbol\beta$、$\boldsymbol\alpha\times\boldsymbol\beta$。

**模型。** 二范数 $\|\boldsymbol\alpha\|_2=\sqrt{a_1^2+a_2^2+a_3^2}$；点乘 $\boldsymbol\alpha\cdot\boldsymbol\beta=\sum a_ib_i$；叉乘按原书 p.108 的三阶行列式展开：

$$
\boldsymbol\alpha\times\boldsymbol\beta=
\begin{vmatrix}
\boldsymbol i & \boldsymbol j & \boldsymbol k\\
a_1 & a_2 & a_3\\
b_1 & b_2 & b_3
\end{vmatrix}
$$


**Python 实现。**

```python
import sympy as sp
A = sp.Matrix([[1], [2], [3]])   # 列向量，即 3×1 矩阵
B = sp.Matrix([[4], [5], [6]])
print("A的模为:", A.norm())              # sqrt(14)
print("A的模的浮点数为:", A.norm().evalf())
print("A的转置矩阵为:", A.T)
print("A和B的点乘为:", A.dot(B))
print("A和B的叉乘为:", A.cross(B))
```

**结果与解释。** $\|\boldsymbol\alpha\|_2=\sqrt{14}=3.74165738677394$；$\boldsymbol\alpha^{\mathrm T}$ 显示为 `Matrix([[1, 2, 3]])`（1×3）；点乘 $32$；叉乘 $[-3,6,-3]^{\mathrm T}$。叉乘结果与 $\boldsymbol\alpha$、$\boldsymbol\beta$ 都正交，可用 `A.dot(A.cross(B)) == 0` 自查。✅

#### 例 3.27（原书 p.109–110）一个奇异矩阵的全套体检

**问题与数据。** $A=\begin{bmatrix}1&2&3&4\\5&6&7&8\\9&10&11&12\\13&14&15&16\end{bmatrix}$，$B=\boldsymbol E_4$。求 $|A|$、$R(A)$、$A^{\mathrm T}$、$(A+10\boldsymbol E)^{-1}$、$A^2$、$AB$、分块矩阵 $[A,B]$ 与 $\begin{bmatrix}A\\B\end{bmatrix}$、左上角 $2\times2$ 子块 $A_1$、删去第 4 行得到的 $A_2$。

**为什么这个矩阵值得单独讲。** 它每行都是等差数列，第 3 行是第 1、2 行的线性组合，所以**秩只有 2、行列式为 0**。也就是说：直接求逆会失败，而加上 $10\boldsymbol E$ 之后就满秩了。这是“符号法能精确暴露结构”的典型例子——数值法只会给你一个 $10^{-15}$ 量级的行列式，让你去猜它是不是零。

**Python 实现。**

```python
import sympy as sp
import numpy as np
A = sp.Matrix(np.arange(1, 17).reshape(4, 4))
B = sp.eye(4)
print("A的行列式为:", sp.det(A))                 # 0
print("A的秩为:", A.rank())                      # 2
print("A的转置矩阵为:", A.transpose())           # 等价于 A.T
print("所求的逆阵为:", (A + 10 * B).inv())
print("A的平方为:", A ** 2)
print("A,B的乘积为:", A * B)
print("横连矩阵为:", A.row_join(B))
print("纵连矩阵为:", A.col_join(B))
print("A1为:", A[0:2, 0:2])
A2 = A.copy(); A2.row_del(3)
print("A2为:", A2)
```

**结果与解释。** $|A|=0$、$R(A)=2$ ✅；$(A+10\boldsymbol E)^{-1}$ 的元素全部是有理数（分母为 1800、300、200 等），不是小数，这正是符号解的价值；$A^2$ 的第一行为 $90,100,110,120$；$A_1=\begin{bmatrix}1&2\\5&6\end{bmatrix}$；$A_2$ 为 $3\times4$。原书 p.110 注明“运行结果就不给出了”，上列结果由本次运行补全。

> 🧩 补充：`A.copy()` 是必要的。`row_del`、`col_del` 会**原地修改**矩阵，若后面还要用原 $A$，不复制就会把数据改掉。这一点在数值版（例 3.34）里换成了不修改原数组的 `np.delete`。

#### 2. 解线性方程组（p.110–111）

三个例子正好对应三种解的情形，是 3.6.2 里“定理 3.1”的符号版预演。

**例 3.28（原书 p.110）唯一解。**

$$
\begin{cases}
2x_1+x_2-5x_3+x_4=8,\\
x_1-3x_2-6x_4=6,\\
2x_2-x_3+2x_4=-2,\\
x_1+4x_2-7x_3+6x_4=2.
\end{cases}
$$


先验秩：$R(A)=4=n$，故唯一解 $\boldsymbol x=A^{-1}\boldsymbol b$，原书结果 $\boldsymbol x=[4,-14/9,-2/9,4/9]^{\mathrm T}$ ✅（本次复核同值，浮点版为 $[4,-1.5556,-0.2222,0.4444]^{\mathrm T}$）。

```python
import sympy as sp
A = sp.Matrix([[2, 1, -5, 1], [1, -3, 0, -6], [0, 2, -1, 2], [1, 4, -7, 6]])
b = sp.Matrix([8, 6, -2, 2])
print("系数矩阵A的秩为:", A.rank())
print("线性方程组的唯一解为:", A.inv() * b)
```

> ⚠️ 原书这一行写的是 `b.transpose()`，单独一句**不起作用**——SymPy 的 `transpose()` 返回新对象，不会原地转置。因为 `sp.Matrix([8,6,-2,2])` 本来就是 4×1 列向量，这句删掉结果不变；若真需要转置，必须写 `b = b.T`。例 3.30 同样有此写法。

**例 3.29（原书 p.110）齐次方程组的基础解系。**

$$
\begin{cases}
x_1-5x_2+2x_3-3x_4=0,\\
5x_1+3x_2+6x_3-x_4=0,\\
2x_1+4x_2+2x_3+x_4=0.
\end{cases}
$$


用 `A.nullspace()` 直接取零空间基，原书结果

$$
\boldsymbol\xi_1=[-9/7,\ 1/7,\ 1,\ 0]^{\mathrm T},\qquad
\boldsymbol\xi_2=[1/2,\ -1/2,\ 0,\ 1]^{\mathrm T}.
$$


✅ 与本次结果一致。注意：**基础解系不唯一**，把 $\xi_1$ 乘以任意非零常数、或把 $\xi_1+k\xi_2$ 换进去，仍是基础解系。后面例 3.35 的数值解与本例符号解就取了不同的基（甚至符号相反），这是正常现象，不是算错。

**例 3.30（原书 p.111）非齐次方程组的通解。**

$$
\begin{cases}
x_1+x_2-3x_3-x_4=1,\\
3x_1-x_2-3x_3+4x_4=4,\\
x_1+5x_2-9x_3-8x_4=0.
\end{cases}
$$


**算法。** 求通解的规范做法：把增广矩阵化成**行最简形**（`rref`），主元列对应“自由变量之外的变量”，非主元列对应自由变量。原书强调要“先使用方法 `rref()` 把增广阵化成行最简形”。

```python
import sympy as sp
A = sp.Matrix([[1, 1, -3, -1], [3, -1, -3, 4], [1, 5, -9, -8]])
b = sp.Matrix([1, 4, 0])
C = A.row_join(b)                      # 构造增广阵
print("增广阵的行最简形为:\n", C.rref())
```

**结果与解释。** `rref()` 返回一个二元组 `(行最简形矩阵, 主元列号)`，原书输出显示主元列为 `(0, 1)`，即第 1、2 列：

$$
\begin{bmatrix}
1&0&-3/2&3/4&5/4\\
0&1&-3/2&-7/4&-1/4\\
0&0&0&0&0
\end{bmatrix}
$$


由此写出等价方程组

$$
\begin{cases}
x_1=\tfrac32x_3-\tfrac34x_4+\tfrac54,\\[2pt]
x_2=\tfrac32x_3+\tfrac74x_4-\tfrac14,
\end{cases}
$$


通解

$$
\boldsymbol x=c_1\begin{bmatrix}3/2\\3/2\\1\\0\end{bmatrix}
+c_2\begin{bmatrix}-3/4\\7/4\\0\\1\end{bmatrix}
+\begin{bmatrix}5/4\\-1/4\\0\\0\end{bmatrix},\quad c_1,c_2\in\mathbb R .
$$


✅ 行最简形与主元列完全复现。解读：$R(A)=R(A,b)=2<4$，无穷多解；括号里最后一项是一个**特解**，前两项张成齐次方程组的解空间。这套“特解＋齐次通解”的写法在数值版里对应“`pinv` 给最小范数解”。

#### 3. 特征值与特征向量（p.112）

**例 3.31（原书 p.112）** 求

$$
A=\begin{bmatrix}0&-2&2\\-2&-3&4\\2&4&-3\end{bmatrix}
$$


的特征值与特征向量。用 `A.eigenvals()`、`A.eigenvects()`，得 $\lambda_1=-8$，$\lambda_2=\lambda_3=1$；对应 $-8$ 的特征向量 $\boldsymbol\xi_1=[-1/2,-1,1]^{\mathrm T}$；对应 $\lambda=1$ 的两个线性无关特征向量 $\boldsymbol\xi_2=[-2,1,0]^{\mathrm T}$、$\boldsymbol\xi_3=[2,0,1]^{\mathrm T}$ ✅。

> 🔍 原书 p.112 正文把三个特征值写成“$\lambda_1=-8,\ \lambda_1=\lambda_2=1$”，第二个等号左边应为 $\lambda_2$（排印重复下标）。以 `eigenvals()` 的输出 `{-8: 1, 1: 2}` 为准。

**例 3.32（原书 p.112）相似对角化。** 同一个 $A$，求可逆 $P$ 使 $P^{-1}AP=\boldsymbol\Lambda$。先用 `A.is_diagonalizable()` 判定，再 `A.diagonalize()`，得

$$
P=\begin{bmatrix}-1&-2&2\\-2&1&0\\2&0&1\end{bmatrix},\qquad
\boldsymbol\Lambda=\begin{bmatrix}-8&0&0\\0&1&0\\0&0&1\end{bmatrix}.
$$


✅ $P$ 的三列正是上面三个特征向量按顺序排列。**注 3.5（p.118）明确说 $P$ 矩阵不唯一**：特征向量可乘常数、重特征值的特征子空间里可换基，所以不同的软件给出不同的 $P$ 都合法，判断标准只有一条——$P^{-1}AP$ 是不是对角阵（数值版例 3.40 就是干这件事）。

#### 3.6.1 小结：符号解什么时候值得用

| 场景 | 适合符号解 | 原因 |
|---|---|---|
| 矩阵含参数、需要带参数结论 | 是 | $\det(A)$、特征多项式可保留参数 |
| 判断秩、判断行列式是否为零 | 是 | 精确算术，没有“阈值”问题 |
| 教学、推导、需要看到通解结构 | 是 | `rref`、`nullspace` 直接给出基 |
| $n$ 很大（几百阶以上） | 否 | 符号运算复杂度爆炸 |
| 数据本身是浮点测量值 | 否 | 精确化没有意义，还会放大规模 |

---

### 3.6.2 线性代数问题的数值解（p.113–118）

**定位。** 科学计算里的矩阵乘法、求逆、分解、特征值，几乎都靠 NumPy 的 `linalg` 子模块。数值解的特点是：一律用浮点数、规模大、速度快；代价是“秩”“是否为零”这类判断要靠阈值，结果带舍入误差。

#### 表 3.1（原书 p.113）NumPy 中常用线性代数函数

| 函数 | 说明 | 函数 | 说明 |
|---|---|---|---|
| `np.eye` | 生成单位矩阵 | `np.dot` | 矩阵乘积 |
| `np.ones` | 生成全 1 矩阵 | `np.inner` | 两个数组的内积 |
| `np.zeros` | 生成零矩阵 | `np.outer` | 两个向量的外积 |
| `np.vander` | 生成范德蒙德矩阵 | `np.trace` | 主对角线元素之和 |
| `np.diag` | 矩阵与一维数组互转 | `np.transpose` | 矩阵转置 |

#### 表 3.2（原书 p.113）`numpy.linalg` 中的重要函数

| 函数 | 说明 | 函数 | 说明 |
|---|---|---|---|
| `det` | 计算矩阵的行列式 | `lstsq` | 计算 $A\boldsymbol x=\boldsymbol b$ 的最小二乘解 |
| `eig` | 计算特征根和特征向量 | `qr` | QR 分解 |
| `eigvals` | 计算方阵特征根 | `svd` | 奇异值分解 |
| `inv` | 计算方阵的逆 | `norm` | 向量或矩阵的范数 |
| `pinv` | Moore-Penrose 伪逆 | `matrix_rank` | 计算矩阵的秩 |
| `solve` | 解线性方程组 $A\boldsymbol x=\boldsymbol b$ | | |

> **本节最容易踩的坑（原书 p.113 加粗强调）**：在 NumPy 的 `array` 里，`*` 与 `multiply` 等价，都是**逐元素相乘**；矩阵乘法要用 `@` 或 `dot()`。

```python
import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 1], [1, 0]])
print(A * B)      # 逐元素：[[0, 2], [3, 0]]
print(A @ B)      # 矩阵乘：[[2, 1], [4, 3]]
```

#### 1. 向量和矩阵的运算（p.113–114）

**例 3.33（续例 3.26，原书 p.113–114）** 同一组 $\boldsymbol\alpha,\boldsymbol\beta$，改用 NumPy：`norm(a)`、`a.dot(b)`、`inner(a,b)`、`cross(a,b)`。结果：二范数 3.7416573867739413、点乘 32、内积 32、叉乘 $[-3,6,-3]$ ✅。

> 注 3.4（原书 p.114）：形状为 $(n,)$ 的**一维数组**既可以看成行向量，也可以看成列向量，因此本例中 `inner(a,b)` 与 `dot(a,b)` 等价。一旦写成二维的 `(n,1)`，行/列方向就必须自己负责，`dot` 不会再帮你转置。

**例 3.34（续例 3.27，原书 p.114）** NumPy 版的全套操作：

```python
import numpy as np
import numpy.linalg as LA
A = np.arange(1, 17).reshape(4, 4)
B = np.eye(4)
print("A的行列式为:", LA.det(A))                 # 0.0（浮点）
print("A的秩为:", LA.matrix_rank(A))             # 2
print("A的转置矩阵为:\n", A.transpose())         # 等价于 A.T
print("所求的逆阵为:\n", LA.inv(A + 10 * B))
print("A的平方为:\n", A.dot(A))
print("A,B的乘积为:\n", A.dot(B))
print("横连矩阵为:", np.c_[A, B])
print("纵连矩阵为:", np.r_[A, B])
print("A1为:", A[0:2, 0:2])
A2 = A.copy(); A2 = np.delete(A2, 3, axis=0)
print("A2为:", A2)
```

**结果与解释。** 与符号版一一对应，但两点必须注意：

1. `LA.det(A)` 在这里恰好返回 `0.0`，因为整数矩阵的浮点行列式正好是 0；换成一般数据，通常会得到 `1e-15` 量级的“零”，**不能直接和 0 比较**。
2. `LA.inv(A)` 会抛 `LinAlgError: Singular matrix`，必须先加 $10\boldsymbol E$ 再求逆。
3. `np.delete` 返回新数组，不修改原 `A`，比 SymPy 的 `row_del` 更安全（原书写 `A2=A.copy(); A2=np.delete(A2,3,axis=0)`）。

#### 2. 齐次线性方程组的数值解（p.115）

**例 3.35（续例 3.29，原书 p.115）** 用 `scipy.linalg.null_space` 求基础解系：

```python
import numpy as np
from scipy.linalg import null_space
A = np.array([[1, -5, 2, -3], [5, 3, 6, -1], [2, 4, 2, 1]])
print("A的零空间(即基础解系)为:", null_space(A))
```

原书结果

$$
\boldsymbol\xi_1=[-0.3546,\ 0.4118,\ -0.0501,\ -0.8380]^{\mathrm T},\qquad
\boldsymbol\xi_2=[0.7151,\ 0.0309,\ -0.6527,\ -0.2483]^{\mathrm T}.
$$


🔍 **核校说明**：本机 `null_space` 给出的是上述两向量的**相反数**（第一列为 $[0.3546,-0.4118,0.0501,0.8380]^{\mathrm T}$）。原因是 `null_space` 取 SVD 的右奇异向量，整体符号由分解过程决定；零空间基本来就不唯一，符号相反完全等价。与例 3.29 的精确基相比，这里得到的是**正交规范基**，形状更“整齐”，但失去了分数结构。

#### 3. 非齐次线性方程组的数值解（p.115–117）

**定理 3.1（原书 p.115）** 对 $n$ 元线性方程组 $A\boldsymbol x=\boldsymbol b$：

1. **无解**的充分必要条件是 $R(A)<R(A,\boldsymbol b)$；
2. **有唯一解**的充分必要条件是 $R(A)=R(A,\boldsymbol b)=n$；
3. **有无穷多解**的充分必要条件是 $R(A)=R(A,\boldsymbol b)<n$。

原书紧接着给出一条极重要的实践提醒：不论数学上是否有解、是否多解，`x = pinv(A).dot(b)` **总能给出一个“解”**：

- 当方程组有无穷多解时，`pinv` 给的是**最小范数解**（在全部解中 $\|\boldsymbol x\|_2$ 最小的那个）；
- 当方程组无解时，`pinv` 给的是**最小二乘解** $\boldsymbol x^*$，满足 $\|A\boldsymbol x^*-\boldsymbol b\|^2$ 最小，即两边误差平方和最小。

这条提醒解释了为什么实际计算里几乎不会看到“求解失败”，也解释了为什么**必须先判秩再看结果**——否则会把一个“最接近的解”误当成真解。

**例 3.36（续例 3.28，原书 p.115–116）唯一解情形。** 数值解 $\boldsymbol x=[4,-1.5556,-0.2222,0.4444]^{\mathrm T}$ ✅。原书同时演示三种写法 `LA.inv(A).dot(b)`、`LA.pinv(A).dot(b)`、`LA.solve(A,b)`，三者结果一致。

> 🧩 补充：三者的取舍不是“都一样”。`inv` 显式求逆再乘，代价约 $O(n^3)$ 且误差更大；`solve` 走 LU 分解，是标准做法；`pinv` 走 SVD，最稳但最慢，只在秩亏或矛盾方程时才需要。工程上默认用 `solve`。

**例 3.37（续例 3.30，原书 p.116）多解情形。** $R(A)=R(A,\boldsymbol b)=2<4$，无穷多解；`pinv` 给最小范数解 $\boldsymbol x=[0.3504,-0.0916,-0.3881,0.4232]^{\mathrm T}$ ✅（本机结果一致到 4 位小数）。注意它与例 3.30 的通解不是同一个向量：通解里 $c_1=c_2=0$ 得到的特解是 $[5/4,-1/4,0,0]^{\mathrm T}$，范数为 1.275；而最小范数解范数约 0.679（$\|[0.3504,-0.0916,-0.3881,0.4232]\|_2$）。

**例 3.38（原书 p.116–117）无解情形。**

$$
\begin{cases}
x_1+x_2=1,\\
2x_1+2x_2=3,\\
x_1+2x_2=2.
\end{cases}
$$


$R(A)=2<R(A,\boldsymbol b)=3$，方程组矛盾。最小二乘解 $\boldsymbol x=[0.8,0.6]^{\mathrm T}$ ✅。检验：残差向量为 $(0.4,-0.2,0)$，平方和 $0.2$，在三个方程间做了折中（前两个方程互相矛盾，第三个方程被精确满足）。

> 🧩 补充：为什么这个例子能得到唯一的最小二乘解？因为 $A$ 是 $3\times2$ 且**列满秩**（$R(A)=2$），此时 $A^{\mathrm T}A$ 可逆，最小二乘解唯一，等于 $(A^{\mathrm T}A)^{-1}A^{\mathrm T}\boldsymbol b$。若 $A$ 还秩亏（如习题 3.7(1)），最小二乘解就有无穷多个，`pinv` 只挑其中范数最小的那个——这一点在习题里会再遇到。

#### 4. 特征值与特征向量（p.117–118）

**例 3.39（续例 3.31，原书 p.117）** `values, vectors = eig(A)`：返回特征值数组与特征向量矩阵（**每一列**是一个特征向量）。原书结果 $\lambda_1=1,\lambda_2=-8,\lambda_3=1$，对应

$$
\boldsymbol\xi_1=[0.9428,-0.2357,0.2357]^{\mathrm T},\quad
\boldsymbol\xi_2=[-0.3333,-0.6667,0.6667]^{\mathrm T},\quad
\boldsymbol\xi_3=[-0.4254,0.7374,0.5247]^{\mathrm T}.
$$


🔍 **核校说明**：$\lambda=1$ 是二重根，其特征子空间是二维的，**任何一组基都合法**。本机 `eig` 给出第三列 $[-0.2981,0.7454,0.5963]^{\mathrm T}$，与原书第三列不同，但同样满足 $A\boldsymbol\xi_3=\boldsymbol\xi_3$；前两列则一致（符号可能整体相反）。这说明：**重特征值对应的特征向量不能逐位比对，只能验证 $A\boldsymbol\xi=\lambda\boldsymbol\xi$**。

**例 3.40（续例 3.39，原书 p.117–118）验证 $P^{-1}AP=\boldsymbol\Lambda$。**

```python
from numpy import array, dot
from numpy.linalg import eig, inv
A = array([[0, -2, 2], [-2, -3, 4], [2, 4, -3]])
values, vectors = eig(A)
check = dot(inv(vectors), A).dot(vectors)
print("check=\n", check)
```

输出矩阵的对角线为 $1,-8,1$，非对角元在 $10^{-16}$ 量级（原书输出形如 `-2.98e-16`、`-1.69e-17`）。✅ 这正是“数值解要带误差判据”的直观展示：**非对角元不是严格的 0，而是机器精度级别的 0**，判断时要看量级，不要看是否等于 0。

> 注 3.5（原书 p.118）：$P$ 矩阵不唯一。数值版的“验算”比“比对”更可靠。

#### 🧩 补充：数值解的三条判据

1. **秩的判断靠阈值。** `matrix_rank` 用 SVD，把小于 $\sigma_{\max}\cdot\max(m,n)\cdot\varepsilon$ 的奇异值当零（$\varepsilon\approx2.2\times10^{-16}$）。数据量纲差异大时，先标准化再判秩。
2. **病态比“秩亏”更隐蔽。** 条件数 $\kappa(A)=\sigma_{\max}/\sigma_{\min}$ 很大（如 $10^{10}$）时，矩阵满秩但解对扰动极敏感；`np.linalg.cond(A)` 可查。原书没有讲这一点，但例 3.27 那个“看起来满秩、其实秩 2”的矩阵就是最好的提醒。
3. **`eig` 可能返回复数。** 实矩阵也可能有复特征值，输出 `dtype` 为 `complex128`；若要实数结果，先确认矩阵对称（用 `eigh`）。

---

### 3.6.3 求超定线性方程组的最小二乘解（p.118–119）

**问题。** 建模中经常遇到“未知数少、方程多”的方程组——比如用 $n$ 个观测点拟合一条直线，只有 2 个未知参数。这时一般**没有精确解**，要找的是使残差平方和最小的 $\boldsymbol x$：

$$
\min_{\boldsymbol x}\ \|A\boldsymbol x-\boldsymbol b\|_2^2
\quad\Longleftrightarrow\quad
A^{\mathrm T}A\,\boldsymbol x=A^{\mathrm T}\boldsymbol b .
$$


后一式叫**正规方程（法方程）**。几何上，最小二乘解是把 $\boldsymbol b$ 正交投影到 $A$ 的列空间后得到的系数。

**三种等价实现**（原书都出现了）：

| 写法 | 适用 | 说明 |
|---|---|---|
| `np.linalg.pinv(A).dot(b)` | 通用 | 基于 SVD，秩亏时也能给最小范数最小二乘解 |
| `np.linalg.lstsq(A, b, rcond=None)` | 推荐 | 返回 `(解, 残差平方和数组, 秩, 奇异值)`，信息最全 |
| `np.linalg.solve(A.T@A, A.T@b)` | 仅列满秩 | 条件数被平方，数值上最不稳，不推荐 |

> ⚠️ 旧 API：NumPy 1.14 起曾对 `lstsq` 省略 `rcond` 发 `FutureWarning`，显式写 `rcond=None` 既消警告也保持跨版本兼容。本次在 NumPy 2.5.4 上实测，省略 `rcond` 已不再告警、结果一致（默认即机器精度阈值），但原书写法仍是最稳妥的，建议保留。

#### 例 3.41（原书 p.118–119）直线拟合的最小二乘

**问题与数据。** 解超定方程组

$$
\begin{bmatrix}0&1\\1&1\\2&1\\3&1\end{bmatrix}
\begin{bmatrix}m\\c\end{bmatrix}
=\begin{bmatrix}-1\\0.2\\0.9\\2.1\end{bmatrix},
$$


等价于给定观测 $x=[0,1,2,3]^{\mathrm T}$、$y=[-1,0.2,0.9,2.1]^{\mathrm T}$，拟合经验函数 $y=mx+c$。

**模型。** 设计矩阵 $A=[\boldsymbol x,\boldsymbol 1]$，参数 $\boldsymbol\theta=[m,c]^{\mathrm T}$，最小化 $\|A\boldsymbol\theta-\boldsymbol y\|^2$。

**Python 实现。**

```python
import numpy as np
import numpy.linalg as LA
import matplotlib.pyplot as plt

x = np.array([0, 1, 2, 3])
y = np.array([-1, 0.2, 0.9, 2.1])
A = np.c_[x, np.ones_like(x)]
m, c = LA.lstsq(A, y, rcond=None)[0]
print(m, c)                       # 1.0 -0.95

plt.plot(x, y, 'o', label='原始数据', markersize=5)
plt.plot(x, m * x + c, 'r', label='拟合直线')
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False
plt.legend(); plt.show()
```

**结果与解释。** $m=1,\ c=-0.95$ ✅，即 $\hat y=x-0.95$。四个点与直线的偏差分别为 $-0.05,0.15,-0.15,0.05$；残差平方和 $0.05$。图 3.6（原书 p.119）画出的散点与直线几乎穿过第三个点、略微偏离第二、四点，正是最小二乘“平分误差”的直观体现。

> 🧩 补充：`np.c_[x, np.ones_like(x)]` 生成的设计矩阵第一列是 $x$、第二列是常数项，因此 `lstsq` 返回的顺序是 $(m,c)$。若把两列颠倒，系数顺序也跟着颠倒——这是回归代码最常见的错位来源。

#### 例 3.42（原书 p.119–120）刀具磨损的经验公式

**问题与数据。** 每隔一小时测量一次刀具厚度，8 组数据（表 3.3，原书 p.119）：

| $t_i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| $y_i$ | 27.0 | 26.8 | 26.5 | 26.3 | 26.1 | 25.7 | 25.3 | 24.8 |

拟合 $y=at+b$。

**Python 实现。**

```python
import numpy as np
import numpy.linalg as LA
t = np.arange(8.0)
y = np.array([27.0, 26.8, 26.5, 26.3, 26.1, 25.7, 25.3, 24.8])
A = np.c_[t, np.ones_like(t)]
ab = LA.lstsq(A, y, rcond=None)[0]
print(ab)                        # [-0.3036  27.125]
```

**结果与解释。** 原书经验公式 $y=-0.3036t+27.125$ ✅，即每小时磨损约 0.30 个单位（题设单位随实测厚度单位）。数据单调下降、几乎成直线，所以拟合误差很小；斜率绝对值的物理含义是磨损速率，截距 27.125 是 $t=0$ 时的初始厚度估计。

> 🧩 补充：这里的 $t$ 从 0 开始，截距才有“初始厚度”的意义；若 $t$ 从 1 开始，截距就只是数学上的外推值。**截距的解释永远取决于自变量的原点**，这一点在 4.5 节还会用到。

#### 3.6.3 与 4.5 的分工（提前说明）

| 问题 | 3.6.3 的写法 | 4.5 的写法 |
|---|---|---|
| 目标 | 解一个矩阵方程 | 建一个统计模型 |
| 输出 | 系数 $\hat{\boldsymbol\theta}$ | 系数 + 标准误 + $R^2$ + $F$ 检验 |
| 假设 | 不涉及分布 | 误差独立、正态、同方差 |
| 典型工具 | `lstsq`、`pinv` | `polyfit`、`statsmodels` |

也就是说：**3.6.3 只回答“系数是多少”，4.5 才回答“这个关系可不可信、能解释多少变异”**。两者用的是同一套最小二乘代数。

## 习题 3（原书 p.120–121）

原书共 16 题。下表列出每题的相关小节和解题入口，后面展开 3.5–3.9 和 3.15。

| 题号 | 主题 | 相关小节 | 思路要点 |
|---|---|---|---|
| 3.1 | 两个积分的符号解 $\int_0^1\sqrt{1+4x}\,dx$、$\int_0^\infty e^{-x}\sin x\,dx$ | 3.4 | `sympy.integrate`，第二个用 `oo` 作上限 |
| 3.2 | $x^3-4x^2+6x-8=0$ 的符号解与数值解 | 3.4、3.5.3 | `solve` 与 `roots`／`np.roots` 对照，注意三次方程有复根 |
| 3.3 | 方程组 $x^2-y-x=3,\ x+3y=6$ 的符号/数值解 | 3.4、3.5.3 | `sp.solve(..., dict=True)`；数值用 `fsolve`，需给初值 |
| 3.4 | 边值问题 $y''+y=x\cos 2x,\ y(0)=1,\ y(2)=3$ | 3.4 | `dsolve` 带初值；也可 `solve_ivp` 打靶 |
| **3.5** | 分块矩阵 $A=\begin{bmatrix}A_1&A_2\\A_3&A_4\end{bmatrix}$ 的行列式 | 3.6.1 | 见下 |
| **3.6** | 两个线性方程组的解 | 3.6.1–3.6.2 | 见下 |
| **3.7** | 先判解的情况，再求唯一解／最小二乘解／最小范数解 | 3.6.2–3.6.3 | 见下 |
| **3.8** | 求 $\begin{bmatrix}6&2&4\\2&3&2\\4&2&6\end{bmatrix}$ 的特征值与特征向量 | 3.6.1–3.6.2 | 见下 |
| 3.9 | 二次型经正交变换化为标准形，求参数与变换矩阵 | 3.6.1–3.6.2 | 标准形为 $y_2^2+2y_3^2$。用二阶主子式和定参数，再取正交特征向量。见下。 |
| 3.10 | $\cos\sqrt{x^2+1}$ 及 0 点处 1、3、5 阶泰勒展开作图 | 3.4、3.5.1 | `series` + `lambdify` |
| 3.11 | 猎狗追击兔子（兔 3 m/s，猎狗 4.5 m/s）的近似轨迹与追击时间 | 3.4、第 8 章 | 建立追及微分方程或逐步仿真 |
| 3.12 | 三个数值积分（无穷区间、二重、三重） | 3.5.2 | `quad`、`dblquad`、`tplquad` |
| 3.13 | $f(x)=2e^{-x}\sin x$ 在 $[0,3]$ 的极小/极大点 | 3.5.4 | `minimize_scalar` 分区间搜索 |
| 3.14 | 旋转体容器体积与抽水做功 | 3.4、3.5.2 | 先写母线方程，再套旋转体公式 |
| 3.15 | 减速伞阻力系数与跑道长度校核 | 3.4、第 8 章 | $m\dot v=-kv$。用位移代替时间，见下。 |
| 3.16 | $f(x_1,x_2)=100(x_2-x_1^2)^2+(1-\sin x_1)^2\cos x_2$ 的一个局部极小点 | 3.5.4 | 多初值 `minimize`，避免停在鞍点 |

### 3.5 分块矩阵的行列式

已知 $A_1=\begin{bmatrix}1&2\\3&4\\5&6\end{bmatrix}$（3×2）、$A_2=\begin{bmatrix}1&1\\2&2\\3&4\end{bmatrix}$（3×2）、$A_3=[2\ \ 6]$、$A_4=[3\ \ 2]$，求 $A=\begin{bmatrix}A_1&A_2\\A_3&A_4\end{bmatrix}$ 的 $|A|$。

**思路。** 先拼后算：SymPy 用 `A1.row_join(A2)` 横拼、`.col_join(A3.row_join(A4))` 纵拼；NumPy 用 `np.block([[A1,A2],[A3,A4]])` 或 `np.vstack([np.hstack([A1,A2]), np.hstack([A3,A4])])`。拼出的 $A$ 是 4×4：

$$
A=\begin{bmatrix}1&2&1&1\\3&4&2&2\\5&6&3&4\\2&6&3&2\end{bmatrix}.
$$


🧩 复核：$|A|=0$、$R(A)=3$（本次计算），即拼出的 4×4 矩阵**降秩**：第 3 列恰是第 2 列的一半（$[1,2,3,3]^{\mathrm T}=\tfrac12[2,4,6,6]^{\mathrm T}$），所以行列式必为 0。**这道题的教学点其实是“分块拼接的顺序”**：`row_join`／`col_join` 的维度必须对齐：$A_1,A_2$ 都是 3×2，先横拼成 3×4；$A_3,A_4$ 都是 1×2，先横拼成 1×4；两次横拼的结果再纵拼，才能得到 4×4。顺带提醒“分块拼出来的矩阵是否可逆，与分块本身无关，取决于拼出的整阵秩”。

### 3.6 两个线性方程组

（1）齐次：

$$
\begin{cases}
x_1+2x_2+x_3-x_4=0,\\
3x_1+6x_2-x_3-3x_4=0,\\
5x_1+10x_2+x_3-5x_4=0.
\end{cases}
$$


**思路。** `A.rank()` 判秩；若 $R(A)=r<n$，用 `nullspace()` 取 $n-r$ 个基向量。🧩 复核：$R(A)=2$，基础解系可取

$$
\boldsymbol\xi_1=[-2,1,0,0]^{\mathrm T},\qquad \boldsymbol\xi_2=[1,0,0,1]^{\mathrm T},
$$


通解 $\boldsymbol x=c_1\boldsymbol\xi_1+c_2\boldsymbol\xi_2$。注意第 2 行是第 1 行的 3 倍、第 3 行是第 1 行的 5 倍，所以秩只有 2。

（2）非齐次：

$$
\begin{cases}
2x+y-z+w=1,\\
4x+2y-2z+w=2,\\
2x+y-z-w=1.
\end{cases}
$$


**思路。** 构造增广阵后 `rref`。🧩 复核：$R(A)=R(A,\boldsymbol b)=2<4$，行最简形为

$$
\begin{bmatrix}1&1/2&-1/2&0&1/2\\0&0&0&1&0\\0&0&0&0&0\end{bmatrix},
$$


故 $x=\tfrac12-\tfrac12y+\tfrac12z,\ w=0$，通解 $x=\tfrac12-\tfrac12c_1+\tfrac12c_2,\ y=c_1,\ z=c_2,\ w=0$。也可用 `pinv` 取最小范数解，但**不能用 `inv`**（矩阵不满秩，会报错）。

### 3.7 先判解的情况，再求对应解

**（1）**

$$
\begin{cases}
4x_1+2x_2-x_3=2,\\
3x_1-x_2+2x_3=10,\\
11x_1+3x_2=8.
\end{cases}
$$


**思路与结论。** 先算 $R(A)$ 与 $R(A,\boldsymbol b)$。🧩 复核：$R(A)=2$、$R(A,\boldsymbol b)=3$，属**无解**情形，应求最小二乘解。但这里 $A$ 列不满秩（3 个未知数、秩 2），所以最小二乘解**不唯一**：`lstsq`／`pinv` 给出最小范数的那一个

$$
\boldsymbol x=[1.2130,\ -1.4478,\ 1.9565]^{\mathrm T},\qquad \|A\boldsymbol x-\boldsymbol b\|_2=2.4495\ (\text{SSE}=6).
$$


⚠️ 这正好暴露一个常见误解：**“无解 ⇒ 最小二乘解唯一”是错的**，唯一性需要 $A$ 列满秩（如例 3.38）。判完秩后，还要再判一次 $R(A)$ 是否等于未知数个数。

**（2）**

$$
\begin{cases}
2x+3y+z=4,\\
x-2y+4z=-5,\\
3x+8y-2z=13,\\
4x-y+9z=-6.
\end{cases}
$$


**思路与结论。** 4 个方程、3 个未知数。🧩 复核：$R(A)=R(A,\boldsymbol b)=2<3$，属**无穷多解**，应用 `pinv` 求最小范数解

$$
\boldsymbol x=[1/3,\ 4/3,\ -2/3]^{\mathrm T},
$$


代回四个方程残差为 0（本次计算残差范数 $4\times10^{-15}$，即机器精度），说明它确实是精确解之一。行最简形为 $\begin{bmatrix}1&0&2&-1\\0&1&-1&2\end{bmatrix}$，故通解 $x=-1-2z,\ y=2+z$。

### 3.8 特征值与特征向量

$$
A=\begin{bmatrix}6&2&4\\2&3&2\\4&2&6\end{bmatrix}.
$$


**思路。** `A.eigenvals()` 与 `A.eigenvects()`；对称矩阵必有实特征值、特征向量可取正交。🧩 复核：$\lambda_1=11$（单根），$\lambda_2=\lambda_3=2$（二重）；对应特征向量

$$
\lambda=11:\ [1,\ 1/2,\ 1]^{\mathrm T};\qquad
\lambda=2:\ [-1/2,\ 1,\ 0]^{\mathrm T},\ [-1,\ 0,\ 1]^{\mathrm T}.
$$


验证方法：`(A - 11*eye(3)).det() == 0`，或逐列检查 $A\boldsymbol\xi=\lambda\boldsymbol\xi$。注意 $11+2+2=15$，恰等于 $\operatorname{tr}(A)=6+3+6=15$，可作为快速自查（特征值之和等于迹）。

### 3.9 二次型的正交标准形

原书 p.121 给出的标准形是 $y_2^2+2y_3^2$。把题目中的两个 $x_1x_2$ 项合并后，对称矩阵的对角元均为 1，三个上三角非对角元依次为 $a+1,1,b$。

目标特征值为 $0,1,2$。由二阶主子式之和等于特征值两两乘积之和，得到

$$
3-\bigl[(a+1)^2+1+b^2\bigr]=2.
$$

因此 $a=-1,b=0$。取对应特征值 $0,1,2$ 的单位特征向量作为 $Q$ 的列，即 $(1,0,-1)^{\mathrm T}/\sqrt 2$、$(0,1,0)^{\mathrm T}$、$(1,0,1)^{\mathrm T}/\sqrt 2$。代入 $x=Qy$ 即得题设标准形。

### 3.15 减速伞与跑道长度

原题设阻力与速度成正比，$m\dot v=-kv$。用 $\dot x=v$ 消去时间，在速度为正的阶段有 $m\,dv/dx=-k$。第一架飞机在 500 m 内从 800 km/h 减至 100 km/h，速度换成 m/s 后得到

$$
k=\frac{5000(800-100)}{3.6\times500}\approx 1944.44\ \mathrm{kg/s}.
$$

第二架飞机的极限滑行距离为 $8000(600/3.6)/k\approx685.7\ \mathrm m$，小于题设的 1200 m。在仅计入题设阻力的模型中，速度趋近于零时的滑行距离满足跑道长度条件。
