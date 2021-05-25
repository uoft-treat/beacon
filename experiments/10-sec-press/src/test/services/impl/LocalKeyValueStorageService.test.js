import '../../setupLocalStorage';
import {LocalKeyValueStorageService} from "../../../services/impl/LocalKeyValueStorageService";

let localKeyValueStorageService;

beforeEach(() => {
    localKeyValueStorageService = new LocalKeyValueStorageService();
});

test('Should be able to set key properly', () => {

    localKeyValueStorageService.setItem("item", "value");

    expect(localKeyValueStorageService.getItem("item")).toBe("value");

});

test('Should be able to get empty key', () => {

    expect(localKeyValueStorageService.getItem("test")).toBe(null);

});
