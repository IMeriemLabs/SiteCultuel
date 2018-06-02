/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LocationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix-detail.component';
import { LocationMySuffixService } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix.service';
import { LocationMySuffix } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix.model';

describe('Component Tests', () => {

    describe('LocationMySuffix Management Detail Component', () => {
        let comp: LocationMySuffixDetailComponent;
        let fixture: ComponentFixture<LocationMySuffixDetailComponent>;
        let service: LocationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [LocationMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LocationMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(LocationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LocationMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.location).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
