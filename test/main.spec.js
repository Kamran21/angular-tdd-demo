var assert=chai.assert;
var expect=chai.expect;

describe("The address book app",function(){
	
	describe("the contact service", function(){
		//
		beforeEach(function(){
			module('addressBook');
			inject(function($injector){
				contactService=$injector.get("contactService");
				$httpBackend=$injector.get("$httpBackend");//comes with angular-mocks
			})
		})
		
		it('should have a property contacts, an array',function(){
		
			expect(contactService.contacts).to.be.an('array');
		
		})
		
		it('should call the backend',function(){
			$httpBackend.expectGET("http://localhost:9001/contacts")
			.respond(200,[]);
			$httpBackend.flush();
		
		})
	
	})
	
	describe("the contact controller", function(){
		//
		beforeEach(function(){
			module('addressBook');
			inject(function($injector,$rootScope){
				$scope=$rootScope.$new();
				contactService=$injector.get("contactService");
				$httpBackend=$injector.get("$httpBackend");//comes with angular-mocks
				$controller=$injector.get("$controller");
			})
		})
		
		it('should store an array of contacts in scope',function(){
			$controller("contactsCtrl",{$scope:$scope,contactService:contactService});
			assert.isArray($scope.contacts);
		
		})
		
	})
	
	describe("the proper fillter", function(){
		//
		beforeEach(function(){
			module('addressBook');
			inject(function($injector){
				proper=$injector.get("$filter")("proper");
			});
		})
		
		it('should proper case a string',function(){
			expect(proper("ned stark")).to.equal("Ned Stark");
			expect(proper("jhon tosak")).to.equal("Jhon Tosak");
		})
		
		it('should take a number and return that as a string',function(){
			expect(proper(42)).to.equal("42");
		})
		
		it('should throw an error on an incompatible type',function(){
			assert.throws(function(){
				proper(undefined);
			});
		})
	})
	
	describe("avatar", function(){
		//
		beforeEach(function(){
			module('addressBook');
		})
		
		it('should display the capitalized first letter of a name',function(){
			inject(function($rootScope,$compile){
				$rootScope.contact={name:'jon arryn'};
				var element=$compile('<avatar name=contact.name></avatar>')($rootScope);
				$rootScope.$digest();
				var dirText=element.text();
				expect(dirText).to.equal("J");
			})
			
		})
	})
	
})