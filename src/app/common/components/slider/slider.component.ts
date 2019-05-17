import { Component, OnInit, OnChanges, OnDestroy, Input, Output,
   EventEmitter, SimpleChange, ElementRef, Renderer2, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private barWidth: number; // 滑块长度
  private barHeight: number; // 滑块高度
  private dragging: boolean; // 拖动状态
  private isClick: boolean; // 区分拖动状态
  private startPosition: number; // 起点位置
  private startX: number; // 拖动起点x
  private startY: number; // 拖动起点y
  private newPosition: number; // 拖动过程中的新位置
  @Input() value: number; // 滑块位置
  @Output() valueChange = new EventEmitter<any>();
  @Input() orientation: string; // 布局方式: 水平，垂直
  @Input() max: number; // 最大值
  @Input() min: number; // 最小值
  @Input() step: number; // 步长
  @Input() style: string;
  @Input() styleClass: string;
  constructor(
    private el: ElementRef,
    private render: Renderer2
    ) {
      this.startPosition = 0;
      this.orientation = 'horizontal';
      this.value = 0;
      this.dragging = false;
      this.isClick = false;
      this.min = 0;
      this.max = 100;
      this.step = 1;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.el.nativeElement.firstChild.clientWidth);
  }

  ngAfterViewChecked() {
    // console.log(this.el.nativeElement.firstChild.clientWidth);
  }

  /**
   * 记录当前位置(所占百分比值)
   */
  get currentPosition() {
    return (this.value - this.min) / (this.max - this.min) * 100;
  }

  /**
   * 按下鼠标
   */
  handleMouseDown(event) {
    console.log(event);
    this.getSliderSize();
    // 记录起点参数
    this.onDragStart(event);
    // 添加事件处理器
    this.render.listen('document', 'mousemove', (event) => {this.onDragging(event); });
    this.render.listen('document', 'mouseup', (event) => {this.onDragEnd(event); });
    event.preventDefault();
  }

  /**
   * 获取轨道长度
   */
  getSliderSize(): void {
    if (this.orientation === 'vertical') {
      this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    } else {
      this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    }
  }

  /**
   * 拖动开始，初始化
   */
  onDragStart(event) {
    this.dragging = true;
    this.isClick = true;
    if (this.orientation === 'vertical') {
      this.startY = event.clientY;
    } else {
      this.startX = event.clientX;
    }
    this.startPosition = this.currentPosition;
  }

  /**
   * 按下并拖动鼠标
   */
  onDragging(event) {
    if (this.dragging) {
      this.isClick = false; // 状态标识
      let diff = 0; // 移动距离所占百分比值
      if (this.orientation === 'vertical') {
        diff = (event.clientY - this.startY) / this.barHeight * 100;
      } else {
        diff = (event.clientX - this.startX) / this.barWidth * 100;
      }
      this.newPosition = this.startPosition + diff; // 总百分比值
      this.setPosition(this.newPosition);
    }
  }

  /**
   * 更新位置
   * @param size 按钮所在位置的百分比值(24.385964912280702)
   */
  setPosition(newPosition: number) {
    if (newPosition === null || isNaN(newPosition)) {
      return ;
    }
    if (newPosition < 0) {
      newPosition = 0;
    }
    if (newPosition > 100) {
      newPosition = 100;
    }
    /**
     * 两个概念
     * 实际移动的位置（200px长，当前移动到60.6px的位置，30.3/%）
     * step：2
     * 显示的范围长度（0-10，值只能为0，2，4，6，8，10）
     * 将值转换到对应的正确的step位置上
     */
    const totalSteps = (this.max - this.min) / this.step; // 总步数 5
    const lengthPerStep = 100 / totalSteps; // 一步占据的百分比值 20/%
    const currentSteps = Math.round(newPosition / lengthPerStep); // 已滑动的步数 30.3/20=1.5步 四舍五入 2步
    const temp = currentSteps * lengthPerStep * 0.01; // 所占刻度的百分比 40%
    let currentLength = temp * (this.max - this.min) + this.min; // newPosition的实际step位置 40%*(10-0)+0 = 4
    currentLength = parseFloat(currentLength.toFixed(0)); // 最新的位置
    this.value = currentLength;
    this.valueChange.emit(this.value);
  }

  onDragEnd(event) {
    this.dragging = false;
    this.isClick = false;
  }



  /**
   * 点击移动到指定轨道位置
   */
  onSliderClick(event) {
    if (this.dragging) {
      return ;
    }
    this.getSliderSize();
    if (this.orientation === 'vertical') {
      const sliderOffsetTop = this.el.nativeElement.children[0].getBoundingClientRect().top;
      this.setPosition((event.clientX - sliderOffsetTop) / this.barHeight * 100);
    } else {
      const sliderOffsetLeft = this.el.nativeElement.children[0].getBoundingClientRect().left;
      this.setPosition((event.clientX - sliderOffsetLeft) / this.barWidth * 100);
    }
  }
}
