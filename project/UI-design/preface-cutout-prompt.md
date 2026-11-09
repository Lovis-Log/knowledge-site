# Landing page 03 书页抠图

生成方式：内置 image_gen，透明背景编辑。

输入：`public/images/preface-warm-light.png`。

输出：`public/images/preface-book-cutout-v1.png`；网站使用保留 Alpha 通道的同名 WebP。

去除原图背景光晕和桌面，保留翻起的书页与纸张纹理。页面取消提亮和整体降透明度，保留左侧遮罩以免干扰文字。

最终提示词：

Edit this exact input image for use as a refined website illustration. The target is the open antique book with its one curling lifted page. Remove the entire background: all blurred golden/brown light, the huge white luminous haze on the left, any light rays/bokeh, and the wooden tabletop. Output a clean true-transparent RGBA cutout of ONLY the same open book and its lifted page, retaining the precise composition, book silhouette, binding, fine natural paper fibers, page edges, printed lines and small engraved pastoral illustration. Recover the left page and left edge naturally where the original white haze obscures them. Retain realistic, restrained warm ivory and aged brown materials; slightly neutralize the yellow cast and reduce blown highlights so fine paper grain and ink detail read clearly. Lighting should be soft even ambient light on the book itself, no luminous fog, no halo, no glow, no background pixels, no surrounding shadow cloud. Clean antialiased edges around every visible part. Keep the exact original landscape framing and book placement, do not change the viewpoint, crop the book further, or add objects or text. The right edge remains cropped as in the original. TRUE TRANSPARENT background, not a checkerboard drawn in the image.
