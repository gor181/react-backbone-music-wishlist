const expect = require('chai').expect;
const AlbumActions = require('../../actions/albums.js');
const AlbumCollection = require('../../collections/albums.js');

describe('Collections:Albums', function () {

    it('Adds an album', function () {
        AlbumActions.addAlbum('Fear of the dark', 150);
        const album = AlbumCollection.at(0);

        expect(album.get('album')).to.equal('Fear of the dark');
        expect(album.get('amount')).to.equal(150);
    });

    it('Removes an album', function () {
        const album = AlbumCollection.at(0);

        expect(AlbumCollection.length).to.equal(1);
        AlbumActions.removeAlbum(album.cid);
        expect(AlbumCollection.length).to.equal(0);
    });

    it('Reorders an album', function() {
        //Add 2 albums
        AlbumCollection.reset();
        AlbumActions.addAlbum('Fear of the dark', 150);
        AlbumActions.addAlbum('TNT', 200);

        let FirstAlbum = AlbumCollection.at(0);
        let SecondAlbum = AlbumCollection.at(1);

        expect(FirstAlbum.get('album')).to.equal('Fear of the dark');
        expect(SecondAlbum.get('album')).to.equal('TNT');

        //Change the order
        AlbumActions.moveAlbum({ id: FirstAlbum.cid }, { id: SecondAlbum.cid });

        FirstAlbum = AlbumCollection.at(0).toJSON();
        SecondAlbum = AlbumCollection.at(1).toJSON();
        
        expect(FirstAlbum.album).to.equal('TNT');
        expect(SecondAlbum.album).to.equal('Fear of the dark');
    });
});


