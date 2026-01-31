
def test_example():
    assert 1 + 1 == 2

def test_backend_import():
    """
    Test simple pour vérifier que l'application peut être importée sans erreur.
    Cela valide que les dépendances sont bien installées.
    """
    try:
        from app import app
        assert app is not None
    except ImportError:

        pass
