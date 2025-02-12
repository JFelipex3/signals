import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy {

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public counter = signal(10);

  public fullName = computed<string>(() => {
    return `${this.user()?.first_name} ${this.user()?.last_name}`;
  });

  // Los efectos tienen limpieza automatica, no requiere que se destruya.
  // Se gatilla solo si una referencia indicada se encuentra afectada por un cambio
  public userChangedEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnDestroy(): void {
    // Esto es para destruir el efecto de modo manual
    //this.userChangedEffect.destroy();
  }

  increaseBy(value: number){
    this.counter.update( current => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }));

    this.user.update( current => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
      }

      return current;
    });

  }
}
