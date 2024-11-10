import { NgModule } from '@angular/core';
import { AnimationService } from './services/animation.service';
import { AnimatedPipe } from './pipes/animated.pipe';

@NgModule({
  declarations: [AnimatedPipe],
  providers: [AnimationService],
  exports: [AnimatedPipe],
})
export class AnimationModule {}
