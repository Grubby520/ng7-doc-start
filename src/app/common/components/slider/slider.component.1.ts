import { Component, OnInit, OnChanges, OnDestroy, Input, Output,
   EventEmitter, SimpleChange, ElementRef, Renderer2, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private dragging: boolean; // 拖动状态
  private isClick: boolean; // 事件类型
  private startX: number;
  private startY: number;
  private startPosition: number;
  private newPosition: number;
  private currentX: number;
  private currentY: number;
  private sliderSize: number; // 滑块长度
  private precision: number; // 保留小数位数
  @Input() value: number;
  @Output() valueChange = new EventEmitter<any>();
  @Input() vertical: boolean; // 垂直布局
  @Input() max: number;
  @Input() min: number;
  @Input() step: number;
  constructor(
    private el: ElementRef,
    private render: Renderer2
    ) {
      this.startPosition = 0;
    this.value = 0;
    this.dragging = true;
    this.isClick = true;
    this.vertical = false;
    this.min = 0; // 起点的值
    this.max = 100; // 终点的值
    this.step = 100;
    this.precision = 3; // 保留3位小数
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
   * 记录当前位置(相对位置 百分比)
   */
  get currentPosition() {
    return `${(this.value - this.min) / (this.max - this.min) * 100}%`;
  }

  /**
   * 按下鼠标
   */
  handleMouseDown(event) {
    console.log('down');
    console.log(event);
    this.getSliderSize();
    console.log(this.sliderSize);
    event.preventDefault();
    // 初始化起点参数
    this.onDragStart(event);
    // 添加事件处理器
    this.render.listen('document', 'mousemove', () => {this.onDragging(event); });
    this.render.listen('document', 'mouseup', () => {this.onDragEnd(event); });
    // window.addEventListener('mousemove', this.onDragging);
    // window.addEventListener('mouseup', this.onDragEnd);
  }

  /**
   * 拖动开始，初始化
   */
  onDragStart(event) {
    this.dragging = true;
    this.isClick = true;
    if (this.vertical) {
      this.startY = event.clientY;
    } else {
      this.startX = event.clientX;
    }
    this.startPosition = parseFloat(this.currentPosition); // 百分比值
  }

  /**
   * 按下并拖动鼠标
   */
  onDragging(event) {
    if (this.dragging) {
      console.log('dragging');
      console.log(event);
      this.isClick = false; // 状态标识
      let diff = 0;
      if (this.vertical) {
        this.currentY = event.clientY;
        diff = (this.currentY - this.startY) / this.sliderSize * 100;
      } else {
        this.currentX = event.clientX;
        console.log(this.currentX);
        diff = (this.currentX - this.startX) / this.sliderSize * 100;
      }
      this.newPosition = this.startPosition + diff;
      this.setPosition(this.newPosition);
    }
  }

  onDragEnd(event) {
    console.log('dragEnd');
    this.dragging = false;
    this.isClick = false;
  }

  /**
   * 更新位置
   * @param size 按钮所在位置的百分比值
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
    // const totalSteps = (this.max - this.min) / this.step; // 总步数
    // const lengthPerStep = (this.max - this.min) / this.step; // 计算每一段的单位长度
    // const steps = Math.round(newPosition / lengthPerStep); // 四舍五入,已移动段数
    // const temp = (this.max - this.min) * 0.01; // 转换成百分比
    // let value = steps * lengthPerStep * temp + this.min;
    // value = parseFloat(value.toFixed(this.precision)); // 最新的位置
    // console.log(newPosition);
    this.value = newPosition;
    this.valueChange.emit(this.value);
  }

  /**
   * 点击移动到指定轨道位置
   */
  onSliderClick(event) {
    console.log('sliderClick');
    if (this.dragging) {
      return ;
    }
    this.getSliderSize();
    if (this.vertical) {

    } else {
      // const sliderOffsetLeft = ''
    }
  }

  /**
   * 获取轨道长度
   */
  getSliderSize(): void {
    if (this.vertical) {
      this.sliderSize = this.el.nativeElement.firstChild.clientHeight;
    } else {
      this.sliderSize = this.el.nativeElement.firstChild.clientWidth;
    }
  }

}
