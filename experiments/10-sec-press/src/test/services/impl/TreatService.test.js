import {IKeyValueStorageService} from "../../../services/IKeyValueStorageService";
import {TreatService} from "../../../services/impl/TreatService";

class MockKeyValueStorageService extends IKeyValueStorageService {
    getItem(key) {
        return "123";
    }

    setItem(key, value) {
        if (key === "TREAT_SESSION" && value === "test token") {
            setItemInvoked = true;
        }
    }
}

let treatService;
let setItemInvoked;

beforeEach(() => {
    treatService   = new TreatService(new MockKeyValueStorageService());
    setItemInvoked = false;
});

test('Service should be able to set token properly without issues', () => {

    treatService.setSessionToken("test token");

    expect(setItemInvoked).toBe(true);

});


test('Service should be able to get token properly', () => {
    expect(treatService.getSessionToken()).toBe("123");
});

test('Should be able to create singleton instance', () => {
    expect(TreatService.getInstance() instanceof TreatService).toBe(true);
    expect(TreatService.getInstance() instanceof TreatService).toBe(true);
});
