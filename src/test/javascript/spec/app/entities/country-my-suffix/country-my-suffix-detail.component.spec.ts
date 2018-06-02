/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CountryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix-detail.component';
import { CountryMySuffixService } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.service';
import { CountryMySuffix } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.model';

describe('Component Tests', () => {

    describe('CountryMySuffix Management Detail Component', () => {
        let comp: CountryMySuffixDetailComponent;
        let fixture: ComponentFixture<CountryMySuffixDetailComponent>;
        let service: CountryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [CountryMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CountryMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CountryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CountryMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.country).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
