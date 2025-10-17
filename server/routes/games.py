from flask import jsonify, Response, Blueprint
from models import db, Game, Publisher, Category
from sqlalchemy.orm import Query

# Create a Blueprint for games routes
games_bp = Blueprint('games', __name__)

def get_games_base_query() -> Query:
    """
    Creates a base SQLAlchemy query for games with joined publisher and category data.
    
    Returns:
        Query: A SQLAlchemy query object that includes Game, Publisher, and Category
               tables joined with outer joins to handle cases where relationships
               might be null.
    """
    return db.session.query(Game).join(
        Publisher, 
        Game.publisher_id == Publisher.id, 
        isouter=True
    ).join(
        Category, 
        Game.category_id == Category.id, 
        isouter=True
    )

@games_bp.route('/api/games', methods=['GET'])
def get_games() -> Response:
    """
    Retrieves all games from the database with their associated publisher and category information.
    
    Returns:
        Response: A JSON response containing a list of all games, each with their
                  id, title, description, publisher info, category info, and star rating.
    """
    # Use the base query for all games
    games_query = get_games_base_query().all()
    
    # Convert the results using the model's to_dict method
    games_list = [game.to_dict() for game in games_query]
    
    return jsonify(games_list)

@games_bp.route('/api/games/<int:id>', methods=['GET'])
def get_game(id: int) -> tuple[Response, int] | Response:
    """
    Retrieves a specific game by its ID with associated publisher and category information.
    
    Args:
        id (int): The unique identifier of the game to retrieve.
    
    Returns:
        tuple[Response, int] | Response: If game is found, returns a JSON response
                                        containing the game data. If not found, returns
                                        a JSON error response with 404 status code.
    """
    # Use the base query and add filter for specific game
    game_query = get_games_base_query().filter(Game.id == id).first()
    
    # Return 404 if game not found
    if not game_query: 
        return jsonify({"error": "Game not found"}), 404
    
    # Convert the result using the model's to_dict method
    game = game_query.to_dict()
    
    return jsonify(game)
