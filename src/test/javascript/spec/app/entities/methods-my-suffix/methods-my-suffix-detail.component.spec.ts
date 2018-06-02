/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MethodsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/methods-my-suffix/methods-my-suffix-detail.component';
import { MethodsMySuffixService } from '../../../../../../main/webapp/app/entities/methods-my-suffix/methods-my-suffix.service';
import { MethodsMySuffix } from '../../../../../../main/webapp/app/entities/methods-my-suffix/methods-my-suffix.model';

describe('Component Tests', () => {

    describe('MethodsMySuffix Management Detail Component', () => {
        let comp: MethodsMySuffixDetailComponent;
        let fixture: ComponentFixture<MethodsMySuffixDetailComponent>;
        let service: MethodsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [MethodsMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MethodsMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(MethodsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MethodsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MethodsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MethodsMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.methods).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
