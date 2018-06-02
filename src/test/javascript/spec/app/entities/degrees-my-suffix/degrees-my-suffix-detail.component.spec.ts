/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DegreesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/degrees-my-suffix/degrees-my-suffix-detail.component';
import { DegreesMySuffixService } from '../../../../../../main/webapp/app/entities/degrees-my-suffix/degrees-my-suffix.service';
import { DegreesMySuffix } from '../../../../../../main/webapp/app/entities/degrees-my-suffix/degrees-my-suffix.model';

describe('Component Tests', () => {

    describe('DegreesMySuffix Management Detail Component', () => {
        let comp: DegreesMySuffixDetailComponent;
        let fixture: ComponentFixture<DegreesMySuffixDetailComponent>;
        let service: DegreesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [DegreesMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DegreesMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DegreesMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DegreesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegreesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DegreesMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.degrees).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
