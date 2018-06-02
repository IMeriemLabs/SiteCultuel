/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DonsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/dons-my-suffix/dons-my-suffix-detail.component';
import { DonsMySuffixService } from '../../../../../../main/webapp/app/entities/dons-my-suffix/dons-my-suffix.service';
import { DonsMySuffix } from '../../../../../../main/webapp/app/entities/dons-my-suffix/dons-my-suffix.model';

describe('Component Tests', () => {

    describe('DonsMySuffix Management Detail Component', () => {
        let comp: DonsMySuffixDetailComponent;
        let fixture: ComponentFixture<DonsMySuffixDetailComponent>;
        let service: DonsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [DonsMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DonsMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DonsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DonsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DonsMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dons).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
