/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PrayerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/prayer-my-suffix/prayer-my-suffix-detail.component';
import { PrayerMySuffixService } from '../../../../../../main/webapp/app/entities/prayer-my-suffix/prayer-my-suffix.service';
import { PrayerMySuffix } from '../../../../../../main/webapp/app/entities/prayer-my-suffix/prayer-my-suffix.model';

describe('Component Tests', () => {

    describe('PrayerMySuffix Management Detail Component', () => {
        let comp: PrayerMySuffixDetailComponent;
        let fixture: ComponentFixture<PrayerMySuffixDetailComponent>;
        let service: PrayerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [PrayerMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PrayerMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PrayerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrayerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrayerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PrayerMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.prayer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
