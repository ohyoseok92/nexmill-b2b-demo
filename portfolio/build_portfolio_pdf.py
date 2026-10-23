"""Build the attachable NEXMILL portfolio from verified demo screenshots."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


HERE = Path(__file__).resolve().parent
OUT = HERE / "NEXMILL-Wishket-Portfolio.pdf"
SHOTS = HERE / "screenshots"
URL = "https://nexmill-industrial-demo.oh6428.chatgpt.site/"
W, H = A4

pdfmetrics.registerFont(TTFont("Malgun", "C:/Windows/Fonts/malgun.ttf"))
pdfmetrics.registerFont(TTFont("MalgunBold", "C:/Windows/Fonts/malgunbd.ttf"))

DARK = HexColor("#10262D")
INK = HexColor("#1A2D31")
MUTED = HexColor("#596B6C")
LIME = HexColor("#DCF473")
PALE = HexColor("#F5F7F3")
LINE = HexColor("#D7DFDC")
WHITE = HexColor("#FFFFFF")


def label(c, text, x, y, size=9, color=MUTED):
    c.setFillColor(color)
    c.setFont("MalgunBold", size)
    c.drawString(x, y, text)


def para(c, text, x, top, width, size=10, leading=17, color=INK, bold=False):
    style = ParagraphStyle(
        "body", fontName="MalgunBold" if bold else "Malgun", fontSize=size,
        leading=leading, textColor=color, wordWrap="CJK", spaceAfter=0,
    )
    p = Paragraph(text, style)
    _, height = p.wrap(width, 1000)
    p.drawOn(c, x, top - height)
    return top - height


def frame(c, image, x, y, width, height):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(x - 1, y - 1, width + 2, height + 2, 7, stroke=1, fill=1)
    c.saveState()
    path = c.beginPath()
    path.roundRect(x, y, width, height, 6)
    c.clipPath(path, stroke=0)
    c.drawImage(ImageReader(str(SHOTS / image)), x, y, width, height, preserveAspectRatio=False, mask="auto")
    c.restoreState()


def base(c, page):
    c.setFillColor(PALE)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(LIME)
    c.rect(0, H - 11, W, 11, stroke=0, fill=1)
    label(c, "NEXMILL  /  PORTFOLIO DEMO", 42, H - 43, 8, DARK)
    c.setStrokeColor(LINE)
    c.line(42, 43, W - 42, 43)
    label(c, "가상 기업·가상 제품으로 만든 자체 제작 시연", 42, 27, 7.5, MUTED)
    label(c, f"{page} / 3", W - 75, 27, 7.5, MUTED)


c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle("NEXMILL - B2B 제조기업 웹사이트 포트폴리오")
c.setAuthor("ohyoseok92")

# Page 1: concise project overview.
base(c, 1)
label(c, "B2B MANUFACTURING WEB", 42, 759, 9, MUTED)
para(c, "회사와 제품을 설명하고<br/>문의까지 이어지는 웹사이트", 42, 743, 510, 24, 34, DARK, True)
para(c, "제조업 의뢰에서 자주 필요한 소개·제품 탐색·문의 접수 흐름을 하나의 반응형 사이트로 구현했습니다.", 42, 659, 510, 10.5, 17)
frame(c, "home-live-desktop.png", 42, 330, 511, 288)
label(c, "01  첫 화면  /  정보 구조와 제품 진입", 42, 313, 8, MUTED)

cards = [
    ("01", "회사 소개", "사업 내용과 제작 흐름을<br/>짧게 파악할 수 있게 구성"),
    ("02", "제품 카탈로그", "설정 파일의 데이터로<br/>목록과 상세 화면 생성"),
    ("03", "문의 접수", "제품 선택을 이어 받아<br/>검증·저장·번호 발급"),
]
for index, (num, title, body) in enumerate(cards):
    x = 42 + index * 174
    c.setFillColor(WHITE)
    c.roundRect(x, 174, 163, 113, 7, stroke=0, fill=1)
    label(c, num, x + 15, 261, 8, MUTED)
    label(c, title, x + 15, 236, 11, DARK)
    para(c, body, x + 15, 220, 136, 8.7, 14)

c.setFillColor(DARK)
c.roundRect(42, 83, 511, 68, 8, stroke=0, fill=1)
label(c, "LIVE DEMO", 59, 126, 8, LIME)
para(c, URL, 59, 115, 470, 10.2, 15, WHITE)
c.linkURL(URL, (42, 83, 553, 151), relative=0)
c.showPage()

# Page 2: product and inquiry views.
base(c, 2)
label(c, "SCREEN FLOW", 42, 759, 9, MUTED)
para(c, "제품을 고른 뒤 문의로 연결", 42, 743, 510, 23, 30, DARK, True)
para(c, "제품 상세의 검토 항목을 읽고 문의로 이동하면 선택한 제품이 입력 화면에 유지됩니다.", 42, 701, 510, 10, 17)
frame(c, "product-detail.png", 42, 390, 511, 288)
label(c, "02  제품 상세  /  특징·규격·검토 항목", 42, 373, 8, MUTED)
frame(c, "contact-form-desktop.png", 42, 67, 511, 288)
label(c, "03  문의 입력  /  가상 정보만 받는 시연용 폼", 42, 51, 8, MUTED)
c.showPage()

# Page 3: responsive views and an honest implementation summary.
base(c, 3)
label(c, "RESPONSIVE & IMPLEMENTATION", 42, 759, 9, MUTED)
para(c, "모바일에서도 같은 흐름", 42, 743, 510, 23, 30, DARK, True)
para(c, "390px 화면에서 홈·제품·문의 화면과 메뉴를 확인했습니다. 가로 넘침 없이 콘텐츠를 읽고 이동할 수 있습니다.", 42, 701, 510, 10, 17)
frame(c, "home-mobile.png", 115, 330, 150, 324)
frame(c, "product-mobile.png", 329, 330, 150, 324)
label(c, "MOBILE / HOME", 115, 315, 7.5, MUTED)
label(c, "MOBILE / PRODUCT", 329, 315, 7.5, MUTED)

c.setFillColor(WHITE)
c.roundRect(42, 164, 511, 126, 7, stroke=0, fill=1)
label(c, "구현과 검증", 58, 265, 11, DARK)
para(c, "React · TypeScript · Vinext · Cloudflare Workers · D1 · Drizzle ORM", 58, 251, 477, 9, 16)
para(c, "서버 입력 검증, D1 저장, 접수번호 발급, 소유자 전용 문의함을 구현했습니다. 공개 주소에서 가상 문의 접수까지 검증했습니다.", 58, 222, 477, 9, 16)

label(c, "범위와 한계", 42, 137, 10, DARK)
para(c, "NEXMILL과 제품은 모두 가상이며 AI 개발 도구를 활용한 자체 제작 데모입니다. 실제 고객 납품 실적이 아니며, 실제 견적·연락·메일 발송은 하지 않습니다. 실서비스에는 고객 원고와 제품 규격 검증, 개인정보 고지, 메일·CRM 연동이 필요합니다.", 42, 127, 511, 9, 15)
c.showPage()
c.save()
print(OUT)
