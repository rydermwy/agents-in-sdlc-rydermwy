# filepath: server/models/base.py
from . import db

class BaseModel(db.Model):
    __abstract__ = True
    
    @staticmethod
    def validate_string_length(field_name, value, min_length=2, allow_none=False):
        """
        Validates that a string field meets minimum length requirements.
        
        Args:
            field_name (str): The name of the field being validated, used in error messages.
            value (str or None): The value to validate.
            min_length (int, optional): Minimum required length for the string. Defaults to 2.
            allow_none (bool, optional): Whether to allow None values. Defaults to False.
        
        Returns:
            str or None: The validated value, stripped of leading/trailing whitespace.
        
        Raises:
            ValueError: If value is None when allow_none is False, if value is not a string,
                       or if the stripped string length is less than min_length.
        """
        if value is None:
            if allow_none:
                return value
            else:
                raise ValueError(f"{field_name} cannot be empty")
        
        if not isinstance(value, str):
            raise ValueError(f"{field_name} must be a string")
            
        if len(value.strip()) < min_length:
            raise ValueError(f"{field_name} must be at least {min_length} characters")
            
        return value